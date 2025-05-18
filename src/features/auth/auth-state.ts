import { create } from 'zustand';
import { persist, createJSONStorage  } from 'zustand/middleware';


export type AuthStatus = 'AUTHENTICATED' | 'UNAUTHENTICATED' | 'PENDING';

export type AuthState = {
  isAuthenticated: boolean;
  isPending: boolean;
  isNeedToRedirect: boolean;
  login: () => void;
  logout: () => void;
  setPending: (state: boolean) => void;
  resetRedirect: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isPending: false,
      isNeedToRedirect: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({
        isAuthenticated: false,
        isNeedToRedirect: true
      }),
      setPending: (state) => set({ isPending: state }),
      resetRedirect: () => set({ isNeedToRedirect: false }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
