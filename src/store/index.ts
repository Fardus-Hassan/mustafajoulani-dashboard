import { configureStore } from "@reduxjs/toolkit";
import adminSettingsReducer from "./slices/adminSettingsSlice";
import apiReducer from "./slices/apiSlice";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      api: apiReducer,
      auth: authReducer,
      adminSettings: adminSettingsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
