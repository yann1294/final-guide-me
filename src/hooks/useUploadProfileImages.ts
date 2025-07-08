// hooks/useUploadProfileImages.ts
import { useState } from "react";
import api from "@/lib/api";
import useAuthStore from "@/stores/authStore";

export type UploadedImages = [profileUrl: string, idUrl: string];

export const useUploadProfileImages = () => {
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (profileFile: File, idFile: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("profilePhoto", profileFile);
      formData.append("identificationFile", idFile);

      const response = await api.post(`/api/images/authentication`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Image upload response:", response.data);
      if (response.data.status !== "success") {
        throw new Error(response.data.message);
      }
      console.log(response.data.data);

      // const imageUrls: string[] = response.data.data;
      // return {
      //   profilePhoto: imageUrls.find((url: string) =>
      //     url.includes("profilePhoto"),
      //   ),
      //   identificationFile: imageUrls.find((url: string) =>
      //     url.includes("identificationFile"),
      //   ),
      // }; // return uploaded image URL
      const urls = response.data.data as string[];
      // [ 0 → profilePhoto, 1 → identificationFile ]
      return [urls[0], urls[1]];
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
};
