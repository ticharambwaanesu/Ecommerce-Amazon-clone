import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import shippedCountSlice from "./slices/shippedCountSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  auth: authReducer, // not persist
  cart: cartReducer, // persisted
  shippedCount: shippedCountSlice, // not persist
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
