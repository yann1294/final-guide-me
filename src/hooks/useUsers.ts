import { AdminDTO } from "@/dto/admin.dto";
import { GuideDTO } from "@/dto/guide.dto";
import { ResponseDTO } from "@/dto/helper.dto";
import { PackageDTO } from "@/dto/package.dto";
import { TouristDTO } from "@/dto/tourist.dto";
import api from "@/lib/api";
import useAuthStore from "@/stores/authStore";
import useUserStore from "@/stores/userStore";
import axios from "axios";
import { useState } from "react";

export interface FullUserDTO {
  uid?: string;
  role?: { name: string };
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  identification?: {
    file?: string;
    type?: string;
  };
  spokenLanguages?: string[];
  availability?: boolean;
}

export const useFetchOneGuide = () => {
  const setTourGuides = useUserStore((state) => state.setTourGuides);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOneGuide = async (guideId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Replace with the actual endpoint for fetching packages
      const response = await axios.get<ResponseDTO>(
        `/api/users/guides/${guideId}`,
      );

      // Check if the response status is 'success'
      if (response.data.status !== "success") {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      // Persist the fetched tours in Zustand store
      setTourGuides(response.data.data as GuideDTO);
    } catch (err) {
      console.error("Error: ", err);
      setError(err instanceof Error ? err.message : "Failed to fetch guides");
    } finally {
      setLoading(false);
    }
  };

  return { fetchOneGuide, loading, error };
};

// get all guides
export const useFetchGuides = () => {
  const setGuides = useUserStore((state) => state.setGuides);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuides = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with the actual endpoint for fetching guides
      const response = await axios.get<ResponseDTO>(`/api/users/guides`);

      // Check if the response status is 'success'
      if (response.data.status !== "success") {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      // Persist the fetched guides in Zustand store
      setGuides(response.data.data as GuideDTO[]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to fetch guides");
    } finally {
      setLoading(false);
    }
  };

  return { fetchGuides, loading, error };
};

// fetch all tourists
export const useFetchTourists = () => {
  const setTourists = useUserStore((state) => state.setTourists);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTourists = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with the actual endpoint for fetching tourists
      const response = await axios.get<ResponseDTO>(`/api/users/tourists`);

      // Check if the response status is 'success'
      if (response.data.status !== "success") {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      // Persist the fetched tourists in Zustand store
      setTourists(response.data.data as TouristDTO[]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to fetch tourists");
    } finally {
      setLoading(false);
    }
  };

  return { fetchTourists, loading, error };
};

// fetch one tourist
export const useFetchOneTourist = () => {
  const setTourists = useUserStore((state) => state.setTourists);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOneTourist = async (touristId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Replace with the actual endpoint for fetching packages
      const response = await axios.get<ResponseDTO>(
        `/api/users/tourists/${touristId}`,
      );

      // Check if the response status is 'success'
      if (response.data.status !== "success") {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      // Persist the fetched tours in Zustand store
      setTourists([response.data.data] as TouristDTO[]);
    } catch (err) {
      console.error("Error: ", err);
      setError(err instanceof Error ? err.message : "Failed to fetch tourists");
    } finally {
      setLoading(false);
    }
  };

  return { fetchOneTourist, loading, error };
};

// update guide
export const useUpdateOneGuide = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { updateGuide } = useUserStore();
  const [updateStatus, setUpdateStatus] = useState<string | "initial">(
    "initial",
  );

  const updateOneGuide = async (oldData: GuideDTO, data: GuideDTO) => {
    setLoading(true);
    setError(null);

    const urlApprove = `http://localhost:3001/admin/guides/approve/${data.uid}`;
    const urlReject = `http://localhost:3001/admin/guides/reject/${data.uid}`;
    const urlPending = `http://localhost:3001/admin/guides/pending/${data.uid}`;
    let response: any = {};

    try {
      // Replace with the actual endpoint for fetching packages
      switch (data.approvalStatus) {
        case "approved":
          {
            console.log("coming here");
            console.log("Old data ", oldData);
            console.log("New DATA", data.approvalStatus);
            response = await axios.patch<ResponseDTO>(urlApprove, {
              approvalStatus: data.approvalStatus,
            });
            console.log("Response: ", response);
          }
          break;

        case "pending":
          console.log("Is this being triggered too ???");
          response = await axios.patch<ResponseDTO>(urlPending, {
            approvalStatus: data.approvalStatus,
          });
          break;
        case "rejected":
          response = await axios.patch<ResponseDTO>(urlReject, {
            approvalStatus: data.approvalStatus,
          });
          break;

        default:
          console.log("Unknown state");
      }
      // const response = await axios.patch<ResponseDTO>(
      //   `/api/users/guides/approve/${data.uid}`, // TODO: endpoint is not correct
      //   { approvalStatus: data.approvalStatus },
      // );

      // Check if the response status is 'success'
      if (response.data.status !== "success") {
        setUpdateStatus("Failed to update guide. Please try again later.");
        console.error("Response request ", response.data);
        throw new Error("Error sent : ", response.data.message);
      }

      console.log("Updated guide: ", response.data);
      // update the guide in the store
      updateGuide({
        ...oldData,
        approvalStatus: data.approvalStatus,
      } as GuideDTO);
      setUpdateStatus("Guide updated successfully");
    } catch (err) {
      console.error("Error: ", err);
      setError(err instanceof Error ? err.message : "Failed to update guide");
    } finally {
      setLoading(false);
    }
  };

  return { updateOneGuide, loading, error, updateStatus };
};

export const useUpdateUserProfile = () => {
  const { accessToken, setUser } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateFullUserProfile = async (
    user: FullUserDTO,
  ): Promise<ResponseDTO | null> => {
    setLoading(true);
    setError(null);

    try {
      const role = user.role?.name;
      if (!role) throw new Error("User role is missing.");
      if (!user.uid) throw new Error("User UID is missing.");
      if (!accessToken) throw new Error("Missing access token.");

      let url = "";
      switch (role) {
        case "tourist":
          url = `/api/users/tourists/${user.uid}`;
          break;
        case "guide":
          url = `/api/users/guides/${user.uid}`;
          break;
        case "admin":
          url = `/api/users/admins/${user.uid}`;
          break;
        default:
          throw new Error("Unsupported user role.");
      }
      const patchBody: Record<string, any> = {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        profilePhoto: user.profilePhoto,
        spokenLanguages: user.spokenLanguages,
        identificationFile: user.identification?.file,
        identificationType: user.identification?.type,
        availability: user.availability,
      };
      console.log(
        "→ PATCH to",
        url,
        "with body:",
        JSON.stringify(patchBody, null, 2),
      );
      const response = await api.patch<ResponseDTO>(url, patchBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // if (response.data.status !== "success") {
      //   throw new Error(response.data.message);
      // }

      // // ✅ Update Zustand store with new user state
      // setUser({
      //   uid: user.uid,
      //   emailAddress: user.emailAddress!,
      //   role: { name: role, permissions: [] }, // safe fallback
      //   firstName: patchBody.firstName,
      //   lastName: patchBody.lastName,
      //   phoneNumber: patchBody.phoneNumber,
      //   profilePhoto: patchBody.profilePhoto,
      //   spokenLanguages: patchBody.spokenLanguages,
      //   identification: {
      //     file: patchBody.identificationFile,
      //     type: patchBody.identificationType,
      //   },
      //   availability: patchBody.availability,
      // });

      // return response.data;
      //    Grab the updated user object (either in data.data or data itself):
      const updated = (response.data as any).data ?? (response.data as any);

      // 3) Update the store with the new user:
      setUser({
        ...user,
        ...updated,
      } as any);

      return updated;
    } catch (err: any) {
      console.error("❌ updateFullUserProfile caught:", {
        message: err.message,
        responseData: err.response?.data,
        status: err.response?.status,
      });
      setError(err.message ?? "Failed to update user profile.");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    updateFullUserProfile,
    loading,
    error,
  };
};
