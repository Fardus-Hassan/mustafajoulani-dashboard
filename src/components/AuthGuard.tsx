"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { rehydrateAuth, loadAuthFromStorage } from "@/store/slices/authSlice";
import DashboardLayout from "./DashboardLayout";

const AUTH_ROUTES = ["/login", "/forgot-password"];

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const [rehydrated, setRehydrated] = useState(false);

  const isAuthRoute = AUTH_ROUTES.includes(pathname ?? "");
  const isAuthenticated = !!accessToken;

  useEffect(() => {
    const state = loadAuthFromStorage();
    if (state.user && state.accessToken) {
      dispatch(rehydrateAuth(state));
    }
    const id = setTimeout(() => setRehydrated(true), 0);
    return () => clearTimeout(id);
  }, [dispatch]);

  useEffect(() => {
    if (!rehydrated) return;
    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/login");
      return;
    }
    if (isAuthenticated && isAuthRoute) {
      router.replace("/");
    }
  }, [rehydrated, isAuthenticated, isAuthRoute, router]);

  if (!rehydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <span className="text-gray-500">Loading…</span>
      </div>
    );
  }

  if (!isAuthenticated && isAuthRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
