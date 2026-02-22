import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "./api/appApi";
import apiReducer from "./slices/apiSlice";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      api: apiReducer,
      auth: authReducer,
      [appApi.reducerPath]: appApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
