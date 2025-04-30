// hooks/useAuth.ts

import { useState } from "react";
import useAuthStore from "@/stores/authStore";

import { Role } from "@/dto/helper.dto";

import api from "@/lib/api";
import {
  LocalSigninAPIResponse,
  LocalSigninResponse,
  PartialUser,
} from "@/dto/login.dto";
import { LocalSignupResponse } from "@/dto/signup.dto";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    setUser,
    setTokens,
  } = useAuthStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Login function
  const signin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Make API call for login
      const response = await api.post<LocalSigninResponse>(`/api/auth/signin`, {
        emailAddress: email,
        password,
      });

      const rawUser = response.data;

      console.log("Received login response:", JSON.stringify(rawUser, null, 2));

      if (!rawUser || !rawUser.uid) {
        throw new Error("Invalid login response.");
      }

      // Map into one of your DTO shapes...
      // If you need more fields (name, photo, etc.) — fetch /users/me
      const loggedInUser: PartialUser = {
        uid: rawUser.uid,
        emailAddress: rawUser.emailAddress,
        role: rawUser.role,
      };

      const accessToken = rawUser.tokens?.accessToken ?? "mock-access-token";
      const refreshToken = rawUser.tokens?.refreshToken ?? "mock-refresh-token";

      // Store user data and token in Zustand store
      // Persist both tokens + user
      login(loggedInUser, accessToken, refreshToken);
      const role = rawUser.role?.name ?? "tourist";
      router.push(`/dashboard/${role}/complete-profile`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 2) Sign up new user → then auto‑signin
  const signup = async (email: string, password: string, role?: Role) => {
    setLoading(true);
    setError(null);

    try {
      const signupBody: Record<string, any> = {
        emailAddress: email,
        password,
      };
      if (role) signupBody.role = role;

      const resp = await api.post<LocalSignupResponse>(
        `/api/auth/signup`,
        signupBody,
      );

      // Backend did not return tokens, so immediately sign in:
      await signin(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message);
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = () => {
    logout(); // Clears user data and token from store
  };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    loading,
    error,
    signin,
    signup,
    logoutUser,
    setUser,
    setTokens,
  };
};
