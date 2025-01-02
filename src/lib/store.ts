import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserSlice from "./features/UserSlice"; // Adjust the path as per your file structure

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["UserSlice"], // Specify which slices to persist
};

// Combine reducers
const rootReducer = combineReducers({
  UserSlice: UserSlice, // Add more reducers here as needed
});

// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializability checks
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create the persistor instance
export const persistor = persistStore(store);

// Infer the type of the store
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
