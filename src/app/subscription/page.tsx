"use client";

import { useCallback, useEffect, useState } from "react";
import PlanCard, { type Plan } from "@/components/PlanCard";
import PlanFormModal from "@/components/PlanFormModal";
import { SkeletonPlanCard } from "@/components/Skeleton";
import { useAppSelector } from "@/store/hooks";
import {
  getSubscriptionPlans,
  deleteSubscriptionPlan,
} from "@/lib/api/subscription";
import type { SubscriptionPlan } from "@/lib/api/subscription";
import toast from "react-hot-toast";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

function mapApiPlanToPlan(api: SubscriptionPlan): Plan {
  return {
    id: api.id,
    name: api.name,
    price: formatPrice(api.price, api.currency),
    period: api.billingPeriod.toLowerCase(),
    description: api.description || "",
    features: api.features.map((f) => ({
      text: f.label,
      included: f.enabled,
    })),
  };
}

export default function SubscriptionPlansPage() {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [apiPlans, setApiPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const fetchPlans = useCallback(() => {
    if (!accessToken) return;
    getSubscriptionPlans(accessToken).then((result) => {
      setLoading(false);
      if (result.ok) {
        setApiPlans(result.data);
        setPlans(result.data.map(mapApiPlanToPlan));
        setError("");
      } else {
        setError(result.message);
        setPlans([]);
        setApiPlans([]);
      }
    });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      const id = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(id);
    }
    fetchPlans();
  }, [accessToken, fetchPlans]);

  function openCreateModal() {
    setModalMode("create");
    setEditingPlan(null);
    setModalOpen(true);
  }

  function openEditModal(planId: string) {
    const apiPlan = apiPlans.find((p) => p.id === planId);
    if (apiPlan) {
      setModalMode("edit");
      setEditingPlan(apiPlan);
      setModalOpen(true);
    }
  }

  function handleDelete(planId: string) {
    if (!accessToken) return;
    if (!confirm("Are you sure you want to delete this plan?")) return;
    deleteSubscriptionPlan(accessToken, planId).then((result) => {
      if (result.ok) {
        toast.success("Plan deleted");
        fetchPlans();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto">
        {/* Header: title + subtitle left, Create New Plan right — Figma align */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between md:mb-12">
          <div>
            <h1 className="text-[28px] font-bold leading-tight text-gray-900 sm:text-[30px] md:text-[32px]">
              Subscription Plans
            </h1>
            <p className="mt-1.5 text-base font-normal text-[#6B7280]">
              Manage your subscription plans and pricing
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#3E8DB9] px-6 py-3.5 text-base font-normal text-white transition-colors hover:bg-[#3E8DB9]/70 md:px-8 md:py-4"
          >
            Create New Plan
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 md:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonPlanCard key={i} />
            ))}
          </div>
        ) : plans.length === 0 && !error ? (
          <div className="py-12 text-center text-gray-500">No subscription plans yet</div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 md:gap-10">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onEdit={() => openEditModal(plan.id)}
                onDelete={() => handleDelete(plan.id)}
              />
            ))}
          </div>
        )}

        <PlanFormModal
          open={modalOpen}
          mode={modalMode}
          initialData={editingPlan}
          accessToken={accessToken}
          onClose={() => setModalOpen(false)}
          onSuccess={fetchPlans}
        />
      </div>
    </div>
  );
}
