// hooks/useAuth.ts
import { useState } from 'react';
import useAuthStore from '@/stores/authStore';
import { TouristDTO } from '@/dto/tourist.dto';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, setUser, setToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Login function
  const authenticate = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Make API call for login (You can use axios or fetch here)
      const response = await fetch(`${process.env.BACKEND_URL}/auth/login-dummy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to authenticate');
      }

      // Assuming the response has `user` and `token` properties
      const loggedInUser: TouristDTO = data.user; // The user response should match the TouristDTO structure
      const authToken: string = data.token; // Authentication token (JWT)

      // Store user data and token in Zustand store
      login(loggedInUser, authToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = () => {
    logout(); // Clears user data and token from store
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    authenticate,
    logoutUser,
    setUser,
    setToken,
  };
};
