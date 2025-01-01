// hooks/useAuth.ts
import { useState } from 'react';
import useAuthStore from '@/stores/authStore';
import axios from 'axios';
import { TouristDTO } from '@/dto/tourist.dto';
import { ResponseDTO, Role } from '@/dto/helper.dto';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, setUser, setToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Login function
  const authenticate = async (email: string, password: string, role: Role) => {
    setLoading(true);
    setError(null);

    try {
      // Make API call for login
      const response = await axios.post<ResponseDTO>(
        `/api/auth/login/${role.name}`,
        { email, password }
      );

      // check if the response.data.status is 'success'
      if (response.data.status !== 'success') {
        throw new Error(response.data.message);
      }

      // Parse the response data from the backend
      const loggedInUser: TouristDTO = response.data.data as TouristDTO;
      const authToken: string = loggedInUser.uid;

      console.log('User logged in:', loggedInUser);
      
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
