import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/config";
import type { RootState } from "@/store/index";
import type {
  DashboardOverviewData,
  DashboardUsersParams,
  DashboardUser,
  DashboardUsersMeta,
} from "@/lib/api/dashboard";
import type { SubscriptionPlan } from "@/lib/api/subscription";
import type { AdminSettingsData } from "@/lib/api/settings";

type DashboardUsersResult = { users: DashboardUser[]; meta: DashboardUsersMeta };

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

function unwrapData<T>(response: { success?: boolean; data?: T; message?: string }): T {
  if (response?.success !== true || response.data === undefined) {
    throw new Error(response?.message ?? "Invalid response");
  }
  return response.data;
}

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery,
  keepUnusedDataFor: 60 * 60,
  refetchOnMountOrArgChange: false,
  tagTypes: ["SubscriptionPlans", "AdminSettings"],
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<DashboardOverviewData, void>({
      query: () => "/admin/dashboard/overview",
      transformResponse: unwrapData,
    }),
    getDashboardUsers: builder.query<
      DashboardUsersResult,
      DashboardUsersParams | void
    >({
      query: (params = {}) => ({
        url: "/admin/dashboard/users",
        params: params as Record<string, string | number | undefined>,
      }),
      transformResponse: unwrapData,
    }),
    getSubscriptionPlans: builder.query<SubscriptionPlan[], void>({
      query: () => "/admin/subscription/plans",
      transformResponse: unwrapData,
      providesTags: ["SubscriptionPlans"],
    }),
    getAdminSettings: builder.query<AdminSettingsData, void>({
      query: () => "/admin/settings",
      transformResponse: unwrapData,
      providesTags: ["AdminSettings"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetDashboardUsersQuery,
  useGetSubscriptionPlansQuery,
  useGetAdminSettingsQuery,
} = appApi;
