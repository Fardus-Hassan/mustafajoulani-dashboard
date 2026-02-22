import { getApiUrl } from "@/lib/config";

export type AdminSettingsData = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  image: string | null;
  role: string;
  usernameForConfirmation: string;
};

export type AdminSettingsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminSettingsData;
};

export async function getAdminSettings(
  accessToken: string
): Promise<
  | { ok: true; data: AdminSettingsData }
  | { ok: false; message: string }
> {
  const res = await fetch(getApiUrl("/admin/settings"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = (await res.json()) as AdminSettingsResponse;
  if (!res.ok) {
    return { ok: false, message: json.message ?? "Failed to fetch settings" };
  }
  if (!json.success || !json.data) {
    return { ok: false, message: json.message ?? "Invalid response" };
  }
  return { ok: true, data: json.data };
}

export type UpdatePasswordBody = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UpdatePasswordResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: { message: string };
};

export async function updatePassword(
  accessToken: string,
  body: UpdatePasswordBody
): Promise<
  | { ok: true; message: string }
  | { ok: false; message: string }
> {
  const res = await fetch(getApiUrl("/admin/settings/password"), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as UpdatePasswordResponse;
  if (!res.ok) {
    return { ok: false, message: json.message ?? "Failed to update password" };
  }
  if (!json.success) {
    return { ok: false, message: json.message ?? "Something went wrong" };
  }
  return { ok: true, message: json.message };
}
