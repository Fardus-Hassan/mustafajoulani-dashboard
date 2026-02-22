import { getApiUrl } from "@/lib/config";
import type { AuthUser } from "@/store/slices/authSlice";

export type LoginBody = { email: string; password: string };
export type LoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthUser & { accessToken: string };
};

export type ForgotPasswordBody = { email: string };
export type ForgotPasswordResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
};

export async function login(
  body: LoginBody
): Promise<{ ok: true; data: LoginResponse["data"] } | { ok: false; message: string }> {
  const res = await fetch(getApiUrl("/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as LoginResponse;
  if (!res.ok) {
    return { ok: false, message: json.message ?? "Login failed" };
  }
  if (!json.success || !json.data?.accessToken) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true, data: json.data };
}

export async function forgotPassword(
  body: ForgotPasswordBody
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const res = await fetch(getApiUrl("/auth/forgot-password"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as ForgotPasswordResponse;
  if (!res.ok) {
    return { ok: false, message: json.message ?? "Request failed" };
  }
  if (!json.success) {
    return { ok: false, message: json.message ?? "Something went wrong" };
  }
  return { ok: true, message: json.message };
}
