// lib/api.ts
import axios from "axios";
import useAuthStore from "@/stores/authStore";

const api = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_CLIENT_URL,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// (Optional) response interceptor can handle 401 → refresh token
export default api;
