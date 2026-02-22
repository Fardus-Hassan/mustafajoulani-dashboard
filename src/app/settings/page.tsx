"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AvatarPlaceholder from "@/components/AvatarPlaceholder";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/hooks";
import { updatePassword } from "@/lib/api/settings";

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3E8DB9]">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#3E8DB9]/30 bg-[#E8F4FC] px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:border-[#3E8DB9] focus:outline-none focus:ring-1 focus:ring-[#3E8DB9]";

const AVATAR_PLACEHOLDER = "/avatar-placeholder.svg";

export default function SettingsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const adminSettings = useAppSelector((s) => s.adminSettings.data);
  const [passwordError, setPasswordError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const settingsImage = adminSettings?.image;
  const profileImage =
    adminSettings != null && (settingsImage == null || settingsImage === "")
      ? AVATAR_PLACEHOLDER
      : (settingsImage || user?.profileImage || AVATAR_PLACEHOLDER);

  useEffect(() => {
    if (adminSettings) {
      const id = setTimeout(
        () =>
          setProfile((p) => ({
            ...p,
            firstName: adminSettings.firstName ?? p.firstName,
            lastName: adminSettings.lastName ?? p.lastName,
            email: adminSettings.email ?? p.email,
          })),
        0
      );
      return () => clearTimeout(id);
    }
    const full = user?.name ?? "";
    const parts = full.trim().split(/\s+/);
    const id = setTimeout(
      () =>
        setProfile((p) => ({
          ...p,
          firstName: parts[0] ?? "",
          lastName: parts.slice(1).join(" ") ?? "",
          email: user?.email ?? p.email,
        })),
      0
    );
    return () => clearTimeout(id);
  }, [
    adminSettings,
    user?.name,
    user?.email,
  ]);

  async function handleSavePassword() {
    setPasswordError("");
    if (!password.current.trim()) {
      setPasswordError("Enter your current password");
      return;
    }
    if (!password.new.trim()) {
      setPasswordError("Enter a new password");
      return;
    }
    if (password.new !== password.confirm) {
      setPasswordError("New password and confirm password do not match");
      return;
    }
    if (!accessToken) {
      toast.error("You must be logged in to change password");
      return;
    }
    setSavingPassword(true);
    const result = await updatePassword(accessToken, {
      oldPassword: password.current,
      newPassword: password.new,
      confirmNewPassword: password.confirm,
    });
    setSavingPassword(false);
    if (!result.ok) {
      setPasswordError(result.message);
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    setPassword({ current: "", new: "", confirm: "" });
  }

  function handleCancel() {
    setPassword({ current: "", new: "", confirm: "" });
    setPasswordError("");
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto">
        {/* Page title */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-[28px] font-bold leading-tight text-gray-900 sm:text-[30px] md:text-[32px]">
            Account & Profile Settings
          </h1>
          <p className="mt-1.5 text-base font-normal text-gray-500">
            Manage your personal account information
          </p>
        </div>

        {/* Profile Information card */}
        <div className="mb-6 rounded-2xl border border-[#3E8DB9]/20 bg-white p-6 shadow-sm md:mb-8 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PersonIcon />
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Information
              </h2>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-[#3E8DB9] hover:bg-[#E8F4FC]"
              aria-label="Edit profile"
            >
              <PencilIcon />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="mt-1.5 flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#E8F4FC] ring-2 ring-[#3E8DB9]/20">
                  {profileImage === AVATAR_PLACEHOLDER ? (
                    <AvatarPlaceholder className="absolute inset-0 h-full w-full " />
                  ) : (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-[#3E8DB9] bg-white px-4 py-2.5 text-sm font-medium text-[#3E8DB9] transition-colors hover:bg-[#E8F4FC]"
                >
                  Change Photo
                </button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, firstName: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, lastName: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
          </div>
        </div>

        {/* Password Settings card */}
        <div className="mb-10 rounded-2xl border border-[#3E8DB9]/20 bg-white p-6 shadow-sm md:mb-12 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LockIcon />
              <h2 className="text-lg font-semibold text-gray-800">
                Password Settings
              </h2>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-[#3E8DB9] hover:bg-[#E8F4FC]"
              aria-label="Edit password"
            >
              <PencilIcon />
            </button>
          </div>

          <div className="space-y-5">
            {passwordError && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {passwordError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={password.current}
                onChange={(e) =>
                  setPassword((p) => ({ ...p, current: e.target.value }))
                }
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password.new}
                onChange={(e) =>
                  setPassword((p) => ({ ...p, new: e.target.value }))
                }
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword((p) => ({ ...p, confirm: e.target.value }))
                }
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {/* Action buttons - bottom right */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-[#3E8DB9] bg-white px-6 py-3 text-base font-medium text-[#3E8DB9] transition-colors hover:bg-[#E8F4FC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSavePassword}
            disabled={savingPassword}
            className="rounded-lg bg-[#3E8DB9] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#2d7aa8] disabled:opacity-60"
          >
            {savingPassword ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
