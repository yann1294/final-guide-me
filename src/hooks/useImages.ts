import { ResponseDTO } from "@/dto/helper.dto";
import { PackageDTO } from "@/dto/package.dto";
import { TourDTO } from "@/dto/tour.dto";
import usePackageStore from "@/stores/packageStore";
import useTourStore from "@/stores/tourStore";
import axios from "axios";
import { useState } from "react";

export const useUploadImages = () => {
  const { updateTour, setCurrentTour, currentTour } = useTourStore();
  const { updatePackage, setCurrentPackage, currentPackage } =
    usePackageStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"created" | "failed" | "initial">(
    "initial",
  );

  const uploadImages = async (formData: FormData, from: "tour" | "package") => {
    setLoading(true);
    setError(null);

    try {
      console.log("Form Data: ", formData);

      // Replace with the actual endpoint for fetching tours
      const response = await axios.post<ResponseDTO>(
        `/api/images/${from}s`,
        formData,
      );
      console.log("Response: ", response.data);
      // Check if the response status is 'success'
      if (response.data.status !== "success") {
        setError(response.data.message);
        setStatus("failed");
        throw new Error(response.data.message);
      }

      if (from === "tour") {
        const tour = { ...(currentTour as TourDTO) };
        const newUrls = response.data.data as string[];
        tour.images = [...(tour.images ?? []), ...newUrls];
        updateTour(tour);
        setCurrentTour(tour);
        setStatus("created");
      } else {
        const pkg = { ...(currentPackage as PackageDTO) };
        const newUrls = response.data.data as string[];
        pkg.images = [...(pkg.images ?? []), ...newUrls];
        updatePackage(pkg);
        setCurrentPackage(pkg);
        setStatus("created");
      }
    } catch (err: any) {
      console.error("Error: ", err);
      setError(err);
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  return { uploadImages, loading, error, status };
};
