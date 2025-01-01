// hooks/useAuth.ts
import { useState } from 'react';
import useAuthStore from '@/stores/authStore';
import axios from 'axios';
import { TouristDTO } from '@/dto/tourist.dto';
import { ResponseDTO, Role } from '@/dto/helper.dto';
import { GuideDTO } from '@/dto/guide.dto';
import { AdminDTO } from '@/dto/admin.dto';

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

      // Get the user data based on the role
      let loggedInUser: TouristDTO | AdminDTO | GuideDTO;

      if (role.name === 'tourist') {
        loggedInUser = response.data.data as TouristDTO;
      } else if (role.name === 'admin') {
        loggedInUser = response.data.data as AdminDTO;
      } else if (role.name === 'guide') {
        loggedInUser = response.data.data as GuideDTO;
      } else {
        // Handle other roles if necessary
        throw new Error('Unsupported role');
      }

      // Get the token from the user data
      const authToken: string = loggedInUser.uid as string;

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
