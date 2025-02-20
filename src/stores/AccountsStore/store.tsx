import { createStore } from "zustand";
import { devtools } from "zustand/middleware";

export type AccountsState = {
  email: string;
  nickname: string;
  profileUrl: string;
};

export type AccountsActions = {
  setAccounts: (accounts: AccountsState) => void;
  unsetAccounts: () => void;
};

export type AccountsStore = AccountsState & AccountsActions;

export const defaultInitState: AccountsState = {
  email: "",
  nickname: "",
  profileUrl: "",
};

export const initAccountsStore = (): AccountsState => {
  return defaultInitState;
};

export const createAccountsStore = (
  initState: AccountsState = defaultInitState
) => {
  return createStore<AccountsStore>()(
    devtools((set) => ({
      ...initState,
      setAccounts: (accounts: AccountsState) => set(() => accounts),
      unsetAccounts: () => set(() => defaultInitState),
    }))
  );
};
