import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refresh: string | null;
  login: (_token: string, _refresh: string) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      refresh: null,
      login: (token: string, refresh: string) => {
        set((state) => ({ ...state, isAuthenticated: true, token, refresh }));
      },
      logout: () => {
        set((state) => ({
          ...state,
          token: null,
          refresh: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
