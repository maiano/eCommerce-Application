import { create } from 'zustand';
import { persist, createJSONStorage  } from 'zustand/middleware';

export type AuthState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: true,
      login: () => set({ isAuthenticated: true }),
      logout: () => {
        console.log('Logging out');
        set({ isAuthenticated: false });
        localStorage.removeItem('auth-store');
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  )
);
