import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('authToken') !== null,
  setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
}));

export default useAuthStore;
