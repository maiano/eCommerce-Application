import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AuthStatus = 'AUTHENTICATED' | 'UNAUTHENTICATED' | 'PENDING';

export type AuthState = {
  status: AuthStatus;
  isNeedToRedirect: boolean;
  setAuthenticated: () => void;
  logout: () => void;
  setPending: () => void;
  resetRedirect: () => void;
  setUnauthenticated: () => void;
  clientReady: boolean;
  setClientReady: (ready: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: 'UNAUTHENTICATED',
      isNeedToRedirect: false,
      clientReady: false,
      setClientReady: (ready: boolean) => set({ clientReady: ready }),
      setAuthenticated: () => set({ status: 'AUTHENTICATED' }),
      logout: () =>
        set({
          status: 'UNAUTHENTICATED',
          isNeedToRedirect: true,
        }),
      setPending: () => set({ status: 'PENDING' }),
      resetRedirect: () => set({ isNeedToRedirect: false }),
      setUnauthenticated: () => set({ status: 'UNAUTHENTICATED' }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        status: state.status,
      }),
    },
  ),
);
