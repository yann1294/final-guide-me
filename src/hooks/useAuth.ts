// hooks/useAuth.ts

import { useState } from "react";
import useAuthStore from "@/stores/authStore";

import { ResponseDTO, Role } from "@/dto/helper.dto";

import api from "@/lib/api";
import {
  LocalSigninAPIResponse,
  LocalSigninResponse,
  PartialUser,
} from "@/dto/login.dto";
import { LocalSignupResponse } from "@/dto/signup.dto";
import { useRouter } from "next/navigation";
import { TouristDTO } from "@/dto/tourist.dto";
import { GuideDTO } from "@/dto/guide.dto";

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
    setAuthStatus,
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

      if (!rawUser?.tokens?.accessToken || !rawUser?.tokens?.refreshToken) {
        throw new Error("Signin failed: server did not return tokens.");
      }

      // Map into one of your DTO shapes...
      // If you need more fields (name, photo, etc.) — fetch /users/me
      // const loggedInUser: PartialUser = {
      //   uid: rawUser.uid,
      //   emailAddress: rawUser.emailAddress,
      //   role: rawUser.role,
      // };

      const accessToken = rawUser.tokens?.accessToken;
      const refreshToken = rawUser.tokens?.refreshToken;

      // Store user data and token in Zustand store
      // Persist both tokens + user
      login(rawUser, accessToken, refreshToken);
      const role = rawUser.role?.name ?? "tourist";

      // 2) If tourist or guide, fetch their profile to see if it's complete
      if (role === "tourist" || role === "guide" || role === "admin") {
        const baseComplete =
          Boolean(rawUser.firstName) &&
          Boolean(rawUser.lastName) &&
          Boolean(rawUser.phoneNumber) &&
          Boolean(rawUser.profilePhoto) &&
          Boolean(rawUser.identificationFile) &&
          Boolean(rawUser.identificationType) &&
          Boolean(rawUser.spokenLanguages);

        const isComplete =
          role === "guide"
            ? baseComplete && Boolean(rawUser.availability)
            : baseComplete;

        if (!isComplete) {
          router.push(`/dashboard/${role}/complete-profile`);
          return;
        }
        router.push(`/dashboard/${role}`);
      }
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
      await signin(email, password);
      const newUser = resp.data;
      const userRole = newUser.role?.name ?? "tourist";
      router.push(`/dashboard/${userRole}/complete-profile`);
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
    user: useAuthStore((s) => s.user),
    accessToken: useAuthStore((s) => s.accessToken),
    refreshToken: useAuthStore((s) => s.refreshToken),
    isAuthenticated: useAuthStore((s) => s.isAuthenticated),
    loading,
    error,
    signin,
    signup,
    logoutUser,
    setUser,
    setTokens,
  };
};
