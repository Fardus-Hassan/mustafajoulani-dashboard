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
