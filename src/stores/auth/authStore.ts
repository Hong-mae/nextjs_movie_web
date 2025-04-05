import { createContext, useContext } from "react";
import { createStore, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  profileUrl?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (payload: { user: User; accessToken: string }) => void;
  logout: () => void;
}

// 1. store 생성 로직
export const createAuthStore = (preloadedState?: Partial<AuthState>) =>
  createStore<AuthState>()(
    devtools(
      (set) => ({
        user: null,
        accessToken: null,
        login: ({ user, accessToken }) => set({ user, accessToken }),
        logout: () => set({ user: null, accessToken: null }),
        ...preloadedState,
      }),
      { name: "🎈 auth-store", enabled: process.env.NODE_ENV === "development" }
    )
  );

// 2. context 생성
export const AuthStoreContext = createContext<StoreApi<AuthState> | null>(null);

// 3. 훅
export const useAuthStore = <T>(selector: (state: AuthState) => T): T => {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error("AuthStoreProvider is missing");
  return selector(store.getState());
};
