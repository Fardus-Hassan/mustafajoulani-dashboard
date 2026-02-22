"use client";

import { useEffect, useState } from "react";
import MetricCard from "@/components/MetricCard";
import { useAppSelector } from "@/store/hooks";
import {
  getDashboardOverview,
  getDashboardUsers,
} from "@/lib/api/dashboard";
import type {
  DashboardOverviewData,
  DashboardUser,
  DashboardUsersMeta,
} from "@/lib/api/dashboard";

function UsersIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SubscribersIcon() {
  return (
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5646 4.40578C19.6629 1.30745 24.6863 1.30745 27.7846 4.40578L35.5929 12.2141C38.6913 15.3124 38.6913 20.3358 35.5929 23.4341L23.6113 35.4158H33.3329C34.0229 35.4158 34.5829 35.9758 34.5829 36.6658C34.5829 37.3558 34.0229 37.9158 33.3329 37.9158H6.66627C5.97627 37.9158 5.41627 37.3558 5.41627 36.6658C5.41627 35.9758 5.97627 35.4158 6.66627 35.4158H12.0379L4.40627 27.7841C1.30794 24.6858 1.30794 19.6624 4.40627 16.5641L16.5646 4.40578ZM13.9813 33.8241C16.1046 35.9458 19.5446 35.9458 21.6663 33.8241L33.8246 21.6658C35.9463 19.5441 35.9463 16.1041 33.8246 13.9808L27.0896 7.24578L7.24627 27.0891L13.9813 33.8241ZM18.3329 6.17411L6.1746 18.3324C4.2896 20.2158 4.0796 23.1408 5.54127 25.2591L25.2596 5.54078C23.1413 4.07911 20.2163 4.28911 18.3329 6.17411ZM31.9363 17.5391C32.4246 18.0274 32.4246 18.8191 31.9363 19.3074L28.2696 22.9725C27.7829 23.4608 26.9913 23.4608 26.5029 22.9725C26.0146 22.4841 26.0146 21.6924 26.5029 21.2041L30.1679 17.5391C30.6563 17.0508 31.4479 17.0508 31.9363 17.5391ZM25.1413 24.2958C25.6296 24.7841 25.6296 25.5758 25.1413 26.0641L23.5096 27.6941C23.0229 28.1824 22.2313 28.1824 21.7429 27.6941C21.2546 27.2058 21.2546 26.4158 21.7429 25.9274L23.3746 24.2958C23.8629 23.8074 24.6529 23.8074 25.1413 24.2958Z" fill="#3E8DB9"/>
</svg>

  );
}

function RevenueIcon() {
  return (
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.08337 14.9997C7.08337 7.86634 12.8667 2.08301 20 2.08301C27.1334 2.08301 32.9167 7.86634 32.9167 14.9997C32.9167 21.7113 27.7967 27.228 21.25 27.8563V29.753C22.2017 29.1997 23.4517 28.7497 25 28.7497C28.9567 28.7497 30.9567 31.6813 31.04 31.8063C31.32 32.2263 31.32 32.773 31.04 33.193C30.9567 33.318 28.9567 36.2497 25 36.2497C23.4517 36.2497 22.2017 35.7997 21.25 35.2463V36.6664C21.25 37.3563 20.69 37.9164 20 37.9164C19.31 37.9164 18.75 37.3563 18.75 36.6664V35.2463C17.7984 35.7997 16.5484 36.2497 15 36.2497C11.0434 36.2497 9.04337 33.318 8.96004 33.193C8.68004 32.773 8.68004 32.2263 8.96004 31.8063C9.04337 31.6813 11.0434 28.7497 15 28.7497C16.5484 28.7497 17.7984 29.1997 18.75 29.753V27.8563C12.2034 27.228 7.08337 21.7113 7.08337 14.9997ZM20 4.58301C14.2467 4.58301 9.58337 9.24634 9.58337 14.9997C9.58337 20.753 14.2467 25.4163 20 25.4163C25.7534 25.4163 30.4167 20.753 30.4167 14.9997C30.4167 9.24634 25.7534 4.58301 20 4.58301ZM21.25 8.33301V9.30468H22.6034C24.2317 9.30468 25.4167 10.688 25.4167 12.2213V13.333C25.4167 13.9363 25.2334 14.518 24.91 14.9997C25.2334 15.4813 25.4167 16.063 25.4167 16.6663V17.778C25.4167 19.3113 24.2317 20.6947 22.6034 20.6947H21.25V21.6663C21.25 22.3563 20.69 22.9163 20 22.9163C19.31 22.9163 18.75 22.3563 18.75 21.6663V20.6947H15.8334C15.1434 20.6947 14.5834 20.1347 14.5834 19.4447C14.5834 18.753 15.1434 18.1947 15.8334 18.1947H16.1467V11.8047H15.8334C15.1434 11.8047 14.5834 11.2463 14.5834 10.5547C14.5834 9.86468 15.1434 9.30468 15.8334 9.30468H18.75V8.33301C18.75 7.64301 19.31 7.08301 20 7.08301C20.69 7.08301 21.25 7.64301 21.25 8.33301ZM15 33.7497C16.5734 33.7497 17.6767 33.0597 18.315 32.4997C17.6784 31.9413 16.5734 31.2497 15 31.2497C13.4267 31.2497 12.3234 31.9397 11.685 32.4997C12.3217 33.058 13.4267 33.7497 15 33.7497ZM21.685 32.4997C22.3217 33.058 23.4267 33.7497 25 33.7497C26.5734 33.7497 27.6767 33.0597 28.315 32.4997C27.6784 31.9413 26.5734 31.2497 25 31.2497C23.4267 31.2497 22.3234 31.9397 21.685 32.4997ZM18.6467 16.2497V18.1947H22.6034C22.7017 18.1947 22.9167 18.0847 22.9167 17.778V16.6663C22.9167 16.3597 22.7017 16.2497 22.6034 16.2497H18.6467ZM18.6467 13.7497H22.6034C22.7017 13.7497 22.9167 13.6397 22.9167 13.333V12.2213C22.9167 11.9147 22.7017 11.8047 22.6034 11.8047H18.6467V13.7497Z" fill="#3E8DB9"/>
</svg>

  );
}

function formatRevenue(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-US");
  } catch {
    return value;
  }
}

function getPaginationPages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  const showLeft = current > 3;
  const showRight = current < total - 2;
  pages.push(1);
  if (showLeft) pages.push("ellipsis");
  const start = showLeft ? Math.max(2, current - 1) : 2;
  const end = showRight ? Math.min(total - 1, current + 1) : total - 1;
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) pages.push(i);
  }
  if (showRight) pages.push("ellipsis");
  if (total > 1) pages.push(total);
  return pages;
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase();
  if (s === "ACTIVE")
    return (
      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
        Active
      </span>
    );
  if (s === "PAUSED" || s === "CANCELLED")
    return (
      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
        {s === "PAUSED" ? "Paused" : "Cancelled"}
      </span>
    );
  if (s === "EXPIRED")
    return (
      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
        Expired
      </span>
    );
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
      {status}
    </span>
  );
}

const USERS_PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 40, 50];

export default function DashboardPage() {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const [data, setData] = useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [usersMeta, setUsersMeta] = useState<DashboardUsersMeta | null>(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersPage, setUsersPage] = useState(1);
  const [usersLimit, setUsersLimit] = useState(10);
  const [usersSearch, setUsersSearch] = useState("");
  const [usersSearchInput, setUsersSearchInput] = useState("");
  const [usersStatus, setUsersStatus] = useState("");
  const [usersPlanName, setUsersPlanName] = useState("");

  useEffect(() => {
    if (!accessToken) {
      const id = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(id);
    }
    let cancelled = false;
    getDashboardOverview(accessToken).then((result) => {
      if (cancelled) return;
      setLoading(false);
      if (result.ok) setData(result.data);
      else setError(result.message);
    });
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    const id = setTimeout(() => setUsersLoading(true), 0);
    getDashboardUsers(accessToken, {
      page: usersPage,
      limit: usersLimit,
      search: usersSearch || undefined,
      status: usersStatus || undefined,
      planName: usersPlanName || undefined,
    }).then((result) => {
      setUsersLoading(false);
      if (result.ok) {
        setUsers(result.data.users);
        setUsersMeta(result.data.meta);
      } else {
        setUsers([]);
        setUsersMeta(null);
      }
    });
    return () => clearTimeout(id);
  }, [accessToken, usersPage, usersLimit, usersSearch, usersStatus, usersPlanName]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6">
        <p className="text-gray-500">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <div className="rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</div>
      </div>
    );
  }

  const metrics = data?.metrics ?? {
    activeUsers: 0,
    totalSubscribers: 0,
    totalRevenue: 0,
  };
  const subscriptionPlans = data?.subscriptionPlans ?? [];
  const planNames = [
    ...new Set(subscriptionPlans.map((p) => p.planName).filter(Boolean)),
  ];

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-base text-gray-500 md:text-lg">Manage subscriptions and monitor key metrics</p>
      </header>

      <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mb-10 lg:gap-6">
        <MetricCard
          title="Total Active Users"
          value={metrics.activeUsers.toLocaleString()}
          icon={<UsersIcon />}
        />
        <MetricCard
          title="Total Subscribers"
          value={metrics.totalSubscribers.toLocaleString()}
          icon={<SubscribersIcon />}
        />
        <MetricCard
          title="Total Revenue"
          value={formatRevenue(metrics.totalRevenue)}
          icon={<RevenueIcon />}
        />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Subscription Plans</h2>
        <p className="mt-1.5 text-base text-gray-500 md:text-lg">Overview of plan performance and revenue</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[400px] text-left text-base">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Plan Name</th>
                <th className="pb-4 pt-1 text-right text-base font-semibold md:text-lg">Users</th>
                <th className="pb-4 pt-1 text-right text-base font-semibold md:text-lg">Price</th>
                <th className="pb-4 pt-1 text-right text-base font-semibold md:text-lg">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionPlans.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No subscription plans yet
                  </td>
                </tr>
              ) : (
                subscriptionPlans.map((row) => (
                  <tr key={row.planId} className="border-b border-gray-100">
                    <td className="py-4 text-base font-medium text-gray-900 md:text-lg">{row.planName}</td>
                    <td className="py-4 text-right text-base text-gray-700 md:text-lg">
                      {row.users.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-base text-gray-700 md:text-lg">
                      {formatRevenue(row.price)}
                    </td>
                    <td className="py-4 text-right text-base text-gray-700 md:text-lg">
                      {formatRevenue(row.totalRevenue)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:mt-10 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">User Management</h2>
        <p className="mt-1.5 text-base text-gray-500 md:text-lg">
          Manage user subscriptions and status
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="users-search" className="sr-only">
              Search by name or email
            </label>
            <input
              id="users-search"
              type="search"
              placeholder="Search by name or email…"
              value={usersSearchInput}
              onChange={(e) => setUsersSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setUsersSearch(usersSearchInput)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 placeholder-gray-500 focus:border-[#3E8DB9] focus:outline-none focus:ring-1 focus:ring-[#3E8DB9]"
            />
          </div>
          <button
            type="button"
            onClick={() => setUsersSearch(usersSearchInput)}
            className="rounded-lg bg-[#3E8DB9] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2d7aa8]"
          >
            Search
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="users-status" className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="users-status"
              value={usersStatus}
              onChange={(e) => {
                setUsersStatus(e.target.value);
                setUsersPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-[#3E8DB9] focus:outline-none focus:ring-1 focus:ring-[#3E8DB9]"
            >
              <option value="">All</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="EXPIRED">Expired</option>
            </select>
            <label htmlFor="users-plan" className="text-sm font-medium text-gray-700">
              Plan
            </label>
            <select
              id="users-plan"
              value={usersPlanName}
              onChange={(e) => {
                setUsersPlanName(e.target.value);
                setUsersPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-[#3E8DB9] focus:outline-none focus:ring-1 focus:ring-[#3E8DB9]"
            >
              <option value="">All plans</option>
              {planNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="users-limit" className="text-sm font-medium text-gray-700">
              Per page
            </label>
            <select
              id="users-limit"
              value={usersLimit}
              onChange={(e) => {
                setUsersLimit(Number(e.target.value));
                setUsersPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-[#3E8DB9] focus:outline-none focus:ring-1 focus:ring-[#3E8DB9]"
            >
              {USERS_PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-base">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">User</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Email</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Plan</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Price</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Status</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Next Billing</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Auto Renew</th>
              </tr>
            </thead>
            <tbody>
              {usersLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Loading users…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((row) => (
                  <tr key={row.userId} className="border-b border-gray-100">
                    <td className="py-4 text-base font-medium text-gray-900 md:text-lg">
                      {row.name || "—"}
                    </td>
                    <td className="py-4 text-base text-gray-600 md:text-lg">{row.email}</td>
                    <td className="py-4 text-base text-gray-700 md:text-lg">
                      {row.planName || "N/A"}
                    </td>
                    <td className="py-4 text-base text-gray-700 md:text-lg">
                      {formatRevenue(row.planPrice)}
                    </td>
                    <td className="py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-4 text-base text-gray-600 md:text-lg">
                      {formatDate(row.nextBilling)}
                    </td>
                    <td className="py-4 text-base text-gray-600 md:text-lg">
                      {row.autoRenew ? "Yes" : "No"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {usersMeta && usersMeta.totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              Showing {(usersMeta.page - 1) * usersMeta.limit + 1}–
              {Math.min(usersMeta.page * usersMeta.limit, usersMeta.total)} of{" "}
              {usersMeta.total.toLocaleString()} users
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setUsersPage(1)}
                disabled={usersMeta.page <= 1 || usersLoading}
                aria-label="First page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="sr-only">First</span>
                <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
              {/* <button
                type="button"
                onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                disabled={usersMeta.page <= 1 || usersLoading}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
              >
                Previous
              </button> */}
              <div className="flex items-center gap-1">
                {getPaginationPages(usersMeta.page, usersMeta.totalPages).map((item, i) =>
                  item === "ellipsis" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="flex h-9 min-w-9 items-center justify-center px-1 text-gray-400"
                      aria-hidden
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setUsersPage(item)}
                      disabled={usersLoading}
                      aria-label={`Page ${item}`}
                      aria-current={usersMeta.page === item ? "page" : undefined}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors ${
                        usersMeta.page === item
                          ? "border-[#3E8DB9] bg-[#3E8DB9] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      } disabled:pointer-events-none disabled:opacity-50`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              {/* <button
                type="button"
                onClick={() => setUsersPage((p) => Math.min(usersMeta.totalPages, p + 1))}
                disabled={usersMeta.page >= usersMeta.totalPages || usersLoading}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
              >
                Next
              </button> */}
              <button
                type="button"
                onClick={() => setUsersPage(usersMeta.totalPages)}
                disabled={usersMeta.page >= usersMeta.totalPages || usersLoading}
                aria-label="Last page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="sr-only">Last</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
