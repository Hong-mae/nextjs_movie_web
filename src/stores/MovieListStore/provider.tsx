"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type MLStore, createMLStore, initMLStore } from "./store";

export type MLStoreApi = ReturnType<typeof createMLStore>;

export const MLStoreContext = createContext<MLStoreApi | undefined>(undefined);

export interface MLStoreProviderProps {
  children: ReactNode;
}

export const MLStoreProvider = ({ children }: MLStoreProviderProps) => {
  const storeRef = useRef<MLStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createMLStore(initMLStore());
  }

  return (
    <MLStoreContext.Provider value={storeRef.current}>
      {children}
    </MLStoreContext.Provider>
  );
};

export const useMLStore = <T,>(selector: (store: MLStore) => T): T => {
  const mlStoreContext = useContext(MLStoreContext);

  if (!mlStoreContext) {
    throw new Error("useMLStore must be used within MLStoreProvider");
  }

  return useStore(mlStoreContext, selector);
};
