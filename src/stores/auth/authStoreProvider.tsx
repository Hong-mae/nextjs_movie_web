"use client";

import { AuthStoreContext, createAuthStore } from "@/stores/auth/authStore";
import { ReactNode, useRef } from "react";

interface AuthStoreProviderProps {
  children: ReactNode;
  initialState?: Partial<ReturnType<typeof createAuthStore>["getState"]>;
}

export default function AuthStoreProvider({
  children,
  initialState,
}: AuthStoreProviderProps) {
  const storeRef = useRef(createAuthStore(initialState));
  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}
