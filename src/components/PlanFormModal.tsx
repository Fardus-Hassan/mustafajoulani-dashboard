"use client";

import { useEffect, useState } from "react";
import type { SubscriptionPlan } from "@/lib/api/subscription";
import {
  createSubscriptionPlan,
  updateSubscriptionPlan,
} from "@/lib/api/subscription";
import toast from "react-hot-toast";

const BILLING_OPTIONS = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

type FeatureRow = { label: string; enabled: boolean };

type PlanFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: SubscriptionPlan | null;
  accessToken: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 placeholder-gray-500 focus:border-[#3E8DB9] focus:outline-none focus:ring-1 focus:ring-[#3E8DB9]";

export default function PlanFormModal({
  open,
  mode,
  initialData,
  accessToken,
  onClose,
  onSuccess,
}: PlanFormModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("MONTHLY");
  const [description, setDescription] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [features, setFeatures] = useState<FeatureRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const title = mode === "create" ? "Create New Plan" : "Edit Plan";
  const submitLabel = mode === "create" ? "Create Plan" : "Update Plan";

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      setFormError("");
      if (mode === "edit" && initialData) {
        setName(initialData.name);
        setPrice(String(initialData.price));
        setBillingPeriod(initialData.billingPeriod || "MONTHLY");
        setDescription(initialData.description || "");
        setIsPopular(initialData.isPopular ?? false);
        setFeatures(
          initialData.features?.length
            ? initialData.features.map((f) => ({ label: f.label, enabled: f.enabled }))
            : [{ label: "", enabled: true }]
        );
      } else {
        setName("");
        setPrice("");
        setBillingPeriod("MONTHLY");
        setDescription("");
        setIsPopular(false);
        setFeatures([{ label: "", enabled: true }]);
      }
    }, 0);
    return () => clearTimeout(id);
  }, [open, mode, initialData]);

  function addFeature() {
    setFeatures((f) => [...f, { label: "", enabled: true }]);
  }

  function removeFeature(index: number) {
    setFeatures((f) => f.filter((_, i) => i !== index));
  }

  function updateFeature(index: number, field: "label" | "enabled", value: string | boolean) {
    setFeatures((f) =>
      f.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError("Plan name is required");
      return;
    }
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setFormError("Enter a valid price");
      return;
    }
    const validFeatures = features
      .map((f) => ({ label: f.label.trim(), enabled: f.enabled }))
      .filter((f) => f.label.length > 0);
    if (validFeatures.length === 0) {
      setFormError("Add at least one feature");
      return;
    }
    if (!accessToken) {
      setFormError("You must be logged in");
      return;
    }
    setSubmitting(true);
    if (mode === "create") {
      createSubscriptionPlan(accessToken, {
        name: trimmedName,
        price: priceNum,
        currency: "usd",
        billingPeriod,
        description: description.trim() || undefined,
        isPopular,
        features: validFeatures,
      })
        .then((result) => {
          setSubmitting(false);
          if (result.ok) {
            toast.success("Plan created successfully");
            onSuccess();
            onClose();
          } else {
            setFormError(result.message);
          }
        })
        .catch(() => {
          setSubmitting(false);
          setFormError("Something went wrong");
        });
    } else if (initialData?.id) {
      updateSubscriptionPlan(accessToken, initialData.id, {
        name: trimmedName,
        price: priceNum,
        billingPeriod,
        description: description.trim() || undefined,
        features: validFeatures,
      })
        .then((result) => {
          setSubmitting(false);
          if (result.ok) {
            toast.success("Plan updated successfully");
            onSuccess();
            onClose();
          } else {
            setFormError(result.message);
          }
        })
        .catch(() => {
          setSubmitting(false);
          setFormError("Something went wrong");
        });
    } else {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="plan-form-title"
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 id="plan-form-title" className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {formError && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Plan Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="e.g., Basic, Pro, Enterprise"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={inputClass}
                  placeholder="$ 0.00"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Billing Period <span className="text-red-500">*</span>
                </label>
                <select
                  value={billingPeriod}
                  onChange={(e) => setBillingPeriod(e.target.value)}
                  className={inputClass}
                >
                  {BILLING_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${inputClass} min-h-[80px] resize-y`}
                placeholder="Brief description of this plan"
                rows={3}
              />
            </div>

            {mode === "create" && (
              <div className="flex items-center gap-2">
                <input
                  id="is-popular"
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#3E8DB9] focus:ring-[#3E8DB9]"
                />
                <label htmlFor="is-popular" className="text-sm font-medium text-gray-700">
                  Mark as popular
                </label>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Features <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => updateFeature(i, "enabled", !f.enabled)}
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#3E8DB9] ${
                        f.enabled
                          ? "bg-[#3E8DB9]"
                          : "border-2 border-gray-300 bg-white"
                      }`}
                      aria-label={f.enabled ? "Disable feature" : "Enable feature"}
                    >
                      {f.enabled && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      )}
                    </button>
                    <input
                      type="text"
                      value={f.label}
                      onChange={(e) => updateFeature(i, "label", e.target.value)}
                      className="min-w-0 flex-1 border-0 bg-transparent py-1 text-base text-gray-900 placeholder-gray-500 focus:ring-0"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="shrink-0 rounded p-1 text-red-500 hover:bg-red-50"
                      aria-label="Remove feature"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 flex items-center gap-2 text-sm font-medium text-[#3E8DB9] hover:underline"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#3E8DB9] text-[#3E8DB9]">
                  +
                </span>
                Add Feature
              </button>
            </div>
          </div>
          </div>

          <div className="shrink-0 flex gap-3 border-t border-gray-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[#3E8DB9] bg-white px-4 py-3 text-base font-medium text-[#3E8DB9] hover:bg-[#E8F4FC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-lg bg-[#3E8DB9] px-4 py-3 text-base font-medium text-white hover:bg-[#2d7aa8] disabled:opacity-60"
            >
              {submitting ? "Saving…" : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
