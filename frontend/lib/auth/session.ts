import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  accountType: "company" | "individual";
  companyName?: string;
  tier?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: (user, token) => set({ user, token }),
      clearSession: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export const getSession = async () => {
  const state = useAuthStore.getState();
  return {
    user: state.user,
    token: state.token,
  };
};

export const setSession = (user: User, token: string) => {
  useAuthStore.getState().setSession(user, token);
};

export const clearSession = () => {
  useAuthStore.getState().clearSession();
};

export default useAuthStore;