import { createSlice } from "@reduxjs/toolkit";

export type AuthUser = {
  name: string;
  email: string;
  profession: string | null;
  profileImage: string | null;
  selectedFocusAreas: unknown;
  bigGoal: string | null;
  number: string | null;
  isProfileSetup: boolean;
  timeZone: string | null;
  workStart: string | null;
  workEnd: string | null;
  workingDays: unknown[];
};

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const AUTH_STORAGE_KEY = "dashboard_auth";

export function loadAuthFromStorage(): AuthState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as AuthState;
    if (parsed.accessToken && parsed.user) return parsed;
  } catch {
    // ignore
  }
  return initialState;
}

export function saveAuthToStorage(state: AuthState): void {
  if (typeof window === "undefined") return;
  if (state.accessToken && state.user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function clearAuthStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: { payload: { user: AuthUser; accessToken: string } }
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    rehydrateAuth: (state, action: { payload: AuthState }) => {
      if (action.payload.user && action.payload.accessToken) {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      }
    },
  },
});

export const { setAuth, logout, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
