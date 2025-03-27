import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  profileUrl?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  hasHydrated: boolean;

  login: (payload: { accessToken: string; user: User }) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        user: null,
        hasHydrated: false,

        login: ({ accessToken, user }) =>
          set({ accessToken, user }, false, "authStore/login"),

        logout: () =>
          set({ accessToken: null, user: null }, false, "authStore/logout"),

        setHydrated: (value) => set({ hasHydrated: value }),
      }),
      {
        name: "auth-storage", // localStorage 키 이름
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      }
    ),
    {
      name: "🧠 AuthStore", // Devtools에 표시될 이름
      enabled: process.env.NODE_ENV === "development",
    }
  )
);

export default useAuthStore;
