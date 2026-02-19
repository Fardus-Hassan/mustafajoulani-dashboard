"use client";

import { useState } from "react";
import PlanCard, { type Plan } from "@/components/PlanCard";

const defaultPlans: Plan[] = [
  {
    id: "base",
    name: "Base Plan",
    price: "$9.99",
    period: "monthly",
    description: "Good for individuals",
    features: [
      { text: "1 Email Account", included: true },
      { text: "1 Phone Number", included: true },
      { text: "Basic Support", included: true },
      { text: "Relationship Automation", included: false },
      { text: "Advanced AI Actions", included: false },
      { text: "Priority Support", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "$29.99",
    period: "monthly",
    description: "Best for growing teams",
    features: [
      { text: "Unlimited Email Accounts", included: true },
      { text: "Unlimited Phone Numbers", included: true },
      { text: "Relationship Automation", included: true },
      { text: "Advanced AI Actions", included: true },
      { text: "Priority Support", included: true },
      { text: "Custom Integrations", included: true },
    ],
  },
];

export default function SubscriptionPlansPage() {
  const [plans] = useState<Plan[]>(defaultPlans);

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
            className="flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#3E8DB9] px-6 py-3.5 text-base font-normal text-white transition-colors hover:bg-[#1d4ed8] md:px-8 md:py-4"
          >
            Create New Plan
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 md:gap-10">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
