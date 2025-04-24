// stores/authStore.ts
import { AdminDTO } from "@/dto/admin.dto";
import { GuideDTO } from "@/dto/guide.dto";
import { PartialUser } from "@/dto/login.dto";
import { TouristDTO } from "@/dto/tourist.dto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: PartialUser | TouristDTO | GuideDTO | AdminDTO | null; // Current authenticated user (TouristDTO)
  accessToken: string | null; // Authentication token (JWT)
  refreshToken: string | null; // Refresh token (JWT)
  method: "google" | "email" | null; // Authentication method
  isAuthenticated: boolean; // Whether the user is authenticated

  login: (
    user: PartialUser | TouristDTO | GuideDTO | AdminDTO,
    accessToken: string,
    refreshToken: string,
  ) => void; // Log the user in
  logout: () => void; // Log the user out
  setUser: (user: TouristDTO) => void; // Set the user data
  setMethod: (method: "google" | "email") => void; // Set the authentication method
  setTokens: (accessToken: string, refreshToken: string) => void; // Set the authentication tokens
}

// Zustand store for authentication state with persistence
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      method: null,
      isAuthenticated: false,

      // Login action to set user and token
      login: (
        user: PartialUser | TouristDTO | GuideDTO | AdminDTO,
        accessToken: string,
        refreshToken: string,
      ) =>
        set({
          user,
          accessToken,
          refreshToken,
          method: null,
          isAuthenticated: true,
        }),

      // Logout action to clear user and token
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          method: null,
          isAuthenticated: false,
        }),

      // Set user data
      setUser: (user: TouristDTO | GuideDTO | AdminDTO) => set({ user }),

      // Set authentication method
      setMethod: (method: "google" | "email") => set({ method }),

      // Set authentication tokens
      setTokens: (accessToken: string, refreshToken: string) =>
        set({ accessToken, refreshToken }),
    }),
    {
      name: "auth-storage", // This will be the name of the key in localStorage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage to persist the state
    },
  ),
);

export default useAuthStore;
