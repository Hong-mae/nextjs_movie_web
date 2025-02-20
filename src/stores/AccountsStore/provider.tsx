"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  createAccountsStore,
  initAccountsStore,
  type AccountsStore,
} from "./store";

export type AccountsStoreApi = ReturnType<typeof createAccountsStore>;

export const AccountsStoreContext = createContext<AccountsStoreApi | undefined>(
  undefined
);

export interface AccountsStoreProviderProps {
  children: ReactNode;
}

export const AccountsStoreProvider = ({
  children,
}: AccountsStoreProviderProps) => {
  const storeRef = useRef<AccountsStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createAccountsStore(initAccountsStore());
  }

  return (
    <AccountsStoreContext.Provider value={storeRef.current}>
      {children}
    </AccountsStoreContext.Provider>
  );
};

export const useAccountsStore = <T,>(
  selector: (store: AccountsStore) => T
): T => {
  const accountStoreContext = useContext(AccountsStoreContext);

  if (!accountStoreContext) {
    throw new Error(
      "useAccountsStore must be used within AccountsStoreProvider"
    );
  }

  return useStore(accountStoreContext, selector);
};
