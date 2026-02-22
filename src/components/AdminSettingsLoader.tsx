"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAdminSettings } from "@/store/slices/adminSettingsSlice";
import { getAdminSettings } from "@/lib/api/settings";

export default function AdminSettingsLoader() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    getAdminSettings(accessToken).then((result) => {
      if (cancelled || !result.ok) return;
      dispatch(setAdminSettings(result.data));
    });
    return () => {
      cancelled = true;
    };
  }, [accessToken, dispatch]);

  return null;
}
