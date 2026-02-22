import { createSlice } from "@reduxjs/toolkit";
import type { AdminSettingsData } from "@/lib/api/settings";

export type AdminSettingsState = {
  data: AdminSettingsData | null;
};

const initialState: AdminSettingsState = {
  data: null,
};

const adminSettingsSlice = createSlice({
  name: "adminSettings",
  initialState,
  reducers: {
    setAdminSettings: (state, action: { payload: AdminSettingsData | null }) => {
      state.data = action.payload;
    },
  },
});

export const { setAdminSettings } = adminSettingsSlice.actions;
export default adminSettingsSlice.reducer;
