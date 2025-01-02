"use client";

import { useMemo } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Use the memoized store instance to ensure it's stable across renders
  const storeInstance = useMemo(() => store, []);

  return (
    <Provider store={storeInstance}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
