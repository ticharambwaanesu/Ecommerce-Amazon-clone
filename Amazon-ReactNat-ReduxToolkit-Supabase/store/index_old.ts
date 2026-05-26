import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import ShippedCount from "./slices/shippedCountSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    shippedCount: ShippedCount,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
