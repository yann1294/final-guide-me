// stores/authStore.ts
import { AdminDTO } from '@/dto/admin.dto';
import { GuideDTO } from '@/dto/guide.dto';
import { TouristDTO } from '@/dto/tourist.dto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
    user: TouristDTO | GuideDTO | AdminDTO | null; // Current authenticated user (TouristDTO)
    token: string | null; // Authentication token (JWT)
    method: "google" | "email" | null; // Authentication method
    isAuthenticated: boolean; // Whether the user is authenticated

    login: (user: TouristDTO | GuideDTO | AdminDTO, token: string) => void; // Log the user in
    logout: () => void; // Log the user out
    setUser: (user: TouristDTO) => void; // Set the user data
    setMethod: (method: "google" | "email") => void; // Set the authentication method
    setToken: (token: string) => void; // Set the authentication token
}

// Zustand store for authentication state with persistence
const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            method: null,
            isAuthenticated: false,

            // Login action to set user and token
            login: (user: TouristDTO | GuideDTO | AdminDTO, token: string) =>
                set({
                    user,
                    token,
                    method: null,
                    isAuthenticated: true,
                }),

            // Logout action to clear user and token
            logout: () =>
                set({
                    user: null,
                    token: null,
                    method: null,
                    isAuthenticated: false,
                }),

            // Set user data
            setUser: (user: TouristDTO | GuideDTO | AdminDTO) => set({ user }),

            // Set authentication method
            setMethod: (method: "google" | "email") => set({ method }),
            
            // Set authentication token
            setToken: (token: string) => set({ token }),
        }),
        {
            name: 'auth-storage', // This will be the name of the key in localStorage
            storage: createJSONStorage(() => sessionStorage), // Use sessionStorage to persist the state
        }
    )
);

export default useAuthStore;
