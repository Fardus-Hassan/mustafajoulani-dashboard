import { getApiUrl } from "@/lib/config";

export type DashboardMetrics = {
  activeUsers: number;
  totalSubscribers: number;
  totalRevenue: number;
};

export type SubscriptionPlanOverview = {
  planId: string;
  planName: string;
  users: number;
  price: number;
  totalRevenue: number;
};

export type DashboardOverviewData = {
  metrics: DashboardMetrics;
  subscriptionPlans: SubscriptionPlanOverview[];
};

export type DashboardOverviewResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardOverviewData;
};

export async function getDashboardOverview(
  accessToken: string
): Promise<
  | { ok: true; data: DashboardOverviewData }
  | { ok: false; message: string }
> {
  const res = await fetch(getApiUrl("/admin/dashboard/overview"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = (await res.json()) as DashboardOverviewResponse;
  if (!res.ok) {
    return {
      ok: false,
      message: json.message ?? "Failed to fetch dashboard overview",
    };
  }
  if (!json.success || !json.data) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true, data: json.data };
}

export type DashboardUser = {
  userId: string;
  name: string;
  email: string;
  planId: string;
  planName: string;
  planPrice: number;
  billingPeriod: string | null;
  status: string;
  nextBilling: string | null;
  autoRenew: boolean;
};

export type DashboardUsersMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type DashboardUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  planName?: string;
};

export type DashboardUsersResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    users: DashboardUser[];
    meta: DashboardUsersMeta;
  };
};

export async function getDashboardUsers(
  accessToken: string,
  params: DashboardUsersParams = {}
): Promise<
  | { ok: true; data: { users: DashboardUser[]; meta: DashboardUsersMeta } }
  | { ok: false; message: string }
> {
  const searchParams = new URLSearchParams();
  if (params.page != null) searchParams.set("page", String(params.page));
  if (params.limit != null) searchParams.set("limit", String(params.limit));
  if (params.search?.trim()) searchParams.set("search", params.search.trim());
  if (params.status?.trim()) searchParams.set("status", params.status.trim());
  if (params.planName?.trim()) searchParams.set("planName", params.planName.trim());
  const query = searchParams.toString();
  const url = getApiUrl("/admin/dashboard/users") + (query ? `?${query}` : "");
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = (await res.json()) as DashboardUsersResponse;
  if (!res.ok) {
    return {
      ok: false,
      message: json.message ?? "Failed to fetch users",
    };
  }
  if (!json.success || !json.data) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true, data: json.data };
}
