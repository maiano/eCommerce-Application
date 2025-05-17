import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => {
    console.log('User logged in');
    set({ isAuthenticated: true });
  },
  logout: () => {
    console.log('User logged out');
    set({ isAuthenticated: false });
  },
}));
