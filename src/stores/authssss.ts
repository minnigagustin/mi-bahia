import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  tokens: {
    refresh: string;
    access: string;
  } | null;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      email: null,
      tokens: null,
      login: (userData: any) => {
        set((state) => ({
          ...state,
          isAuthenticated: true,
          username: userData.username,
          email: userData.email,
          tokens: {
            refresh: userData.tokens.refresh,
            access: userData.tokens.access,
          },
        }));
      },
      logout: () => {
        set((state) => ({
          ...state,
          username: null,
          email: null,
          tokens: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
