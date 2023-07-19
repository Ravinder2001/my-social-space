import { configureStore } from "@reduxjs/toolkit";

import LoginPageReducer from "./Slices/LoginPageSlice";

export const store = configureStore({
  reducer: {
    LoginPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
