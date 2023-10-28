import storage from "redux-persist/lib/storage";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import LoginPageReducer from "./Slices/LoginPageSlice";
import UserReducer from "./Slices/UserSlice";
import DrawerReducer from "./Slices/DrawerSlice";
import TempReducer from "./Slices/TempSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [""],
};

const rootReducer = combineReducers({
  LoginPageReducer,
  UserReducer,
  DrawerReducer,
  TempReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
