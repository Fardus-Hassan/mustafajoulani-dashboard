import { createSelector, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@/lib/config";
import type { RootState } from "../index";

export type ApiState = {
  baseUrl: string;
};

const initialState: ApiState = {
  baseUrl: API_BASE_URL,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setBaseUrl: (state, action: { payload: string }) => {
      state.baseUrl = action.payload;
    },
  },
});

export const { setBaseUrl } = apiSlice.actions;
export default apiSlice.reducer;

// Selectors
export const selectApiBaseUrl = (state: RootState) => state.api.baseUrl;

/** Returns a function that builds full API URL for a path. Use in component: const getApiUrl = useAppSelector(selectGetApiUrl); getApiUrl("/subscriptions") */
export const selectGetApiUrl = createSelector(
  [selectApiBaseUrl],
  (baseUrl) =>
    (path: string): string => {
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      return `${baseUrl}${normalizedPath}`;
    }
);
