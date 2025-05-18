// hooks/useUploadProfileImages.ts
import { useState } from "react";
import api from "@/lib/api";

export const useUploadProfileImages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (
    file: File,
    type: "profile" | "identification",
  ) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(`/api/images/${type}`, formData);

      if (response.data.status !== "success") {
        throw new Error(response.data.message);
      }
      console.log(response.data.data);
      return response.data.data as string; // return uploaded image URL
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
};
