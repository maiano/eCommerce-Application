import { create } from 'zustand';
import { persist, createJSONStorage  } from 'zustand/middleware';


export type AuthStatus = 'AUTHENTICATED' | 'UNAUTHENTICATED' | 'PENDING';

export type AuthState = {
  status: AuthStatus;
  isNeedToRedirect: boolean;
  login: () => void;
  logout: () => void;
  setPending: () => void;
  resetRedirect: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: 'UNAUTHENTICATED',
      isNeedToRedirect: false,
      login: () => set({ status: 'AUTHENTICATED' }),
      logout: () => set({
        status: 'UNAUTHENTICATED',
        isNeedToRedirect: true
      }),
      setPending: () => set({ status: 'PENDING' }),
      resetRedirect: () => set({ isNeedToRedirect: false }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        status: state.status
      }),
    }
  )
);
