import { getApiUrl } from "@/lib/config";

export type SubscriptionPlanFeature = {
  label: string;
  enabled: boolean;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: string;
  isPopular: boolean;
  description: string;
  features: SubscriptionPlanFeature[];
  createdAt: string;
  updatedAt: string;
  totalSubscribers: number;
};

export type SubscriptionPlansResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: SubscriptionPlan[];
};

export async function getSubscriptionPlans(
  accessToken: string
): Promise<
  | { ok: true; data: SubscriptionPlan[] }
  | { ok: false; message: string }
> {
  const res = await fetch(getApiUrl("/admin/subscription/plans"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = (await res.json()) as SubscriptionPlansResponse;
  if (!res.ok) {
    return {
      ok: false,
      message: json.message ?? "Failed to fetch subscription plans",
    };
  }
  if (!json.success || !Array.isArray(json.data)) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true, data: json.data };
}

export type CreatePlanBody = {
  name: string;
  price: number;
  currency: string;
  billingPeriod: string;
  description?: string;
  isPopular?: boolean;
  features: { label: string; enabled: boolean }[];
};

export type UpdatePlanBody = {
  name: string;
  price: number;
  billingPeriod: string;
  description?: string;
  features: { label: string; enabled: boolean }[];
};

export async function createSubscriptionPlan(
  accessToken: string,
  body: CreatePlanBody
): Promise<
  | { ok: true; data: SubscriptionPlan }
  | { ok: false; message: string }
> {
  const res = await fetch(getApiUrl("/admin/subscription/plans"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as { success: boolean; message: string; data?: SubscriptionPlan };
  if (!res.ok) {
    return { ok: false, message: json.message ?? "Failed to create plan" };
  }
  if (!json.success || !json.data) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true, data: json.data };
}

export async function updateSubscriptionPlan(
  accessToken: string,
  planId: string,
  body: UpdatePlanBody
): Promise<
  | { ok: true; data: SubscriptionPlan }
  | { ok: false; message: string }
> {
  const res = await fetch(getApiUrl(`/admin/subscription/plans/${planId}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as { success: boolean; message: string; data?: SubscriptionPlan };
  if (!res.ok) {
    return { ok: false, message: json.message ?? "Failed to update plan" };
  }
  if (!json.success || !json.data) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true, data: json.data };
}

export async function deleteSubscriptionPlan(
  accessToken: string,
  planId: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  const res = await fetch(getApiUrl(`/admin/subscription/plans/${planId}`), {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = (await res.json()) as { success: boolean; message: string };
  if (!res.ok) {
    return { ok: false, message: json.message ?? "Failed to delete plan" };
  }
  if (!json.success) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true };
}
