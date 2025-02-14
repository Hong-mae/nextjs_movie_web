"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type YTDialogStore,
  createYTDialogStore,
  initYTDialogStore,
} from "./store";

export type YTDialogStoreApi = ReturnType<typeof createYTDialogStore>;

export const YTDialogStoreContext = createContext<YTDialogStoreApi | undefined>(
  undefined
);

export interface YTDialogStoreProviderProps {
  children: ReactNode;
}

export const YTDialogStoreProvider = ({
  children,
}: YTDialogStoreProviderProps) => {
  const storeRef = useRef<YTDialogStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createYTDialogStore(initYTDialogStore());
  }

  return (
    <YTDialogStoreContext.Provider value={storeRef.current}>
      {children}
    </YTDialogStoreContext.Provider>
  );
};

export const useYTDialogStore = <T,>(
  selector: (store: YTDialogStore) => T
): T => {
  const ytdialogStoreContext = useContext(YTDialogStoreContext);

  if (!ytdialogStoreContext) {
    throw new Error(
      `useYTDialogStore must be used within YTDialogStorePrivder`
    );
  }

  return useStore(ytdialogStoreContext, selector);
};
