import { ResponseDTO } from "@/dto/helper.dto";
import { TourDTO } from "@/dto/tour.dto";
import useTourStore from "@/stores/tourStore";
import axios from "axios";
import { useState } from "react";

export const useUploadImages = () => {
    const { updateTour, setCurrentTour, currentTour } = useTourStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<"created" | "failed" | "initial">("initial");
  
    const uploadImages = async (formData: FormData) => {
      setLoading(true);
      setError(null);
  
      try {
        console.log("Form Data: ", formData)
  
        // Replace with the actual endpoint for fetching tours
        const response = await axios.post<ResponseDTO>(`/api/images/tours`, formData);
  
        // Check if the response status is 'success'
        if (response.data.status !== 'success') {
          setError(response.data.message);
          setStatus("failed");
          throw new Error(response.data.message);
        }
  
        // update tour
        let tour: TourDTO = currentTour as TourDTO;
        tour.images = response.data.data as string[];

        updateTour(tour);
        setCurrentTour(tour);
        setStatus("created");
        console.log(response.data)
      } catch (err: any) {
        // console.error("Error: ", err);
        setError(err);
        setStatus("failed");
      } finally {
        setLoading(false);
      }
    };
  
    return { uploadImages, loading, error, status };
  };