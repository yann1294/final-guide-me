import useSWR from "swr";
import axios from "axios";
import { ResponseDTO } from "@/dto/helper.dto";
import { TourDTO } from "@/dto/tour.dto";
import { useState } from "react";
import useTourStore from "@/stores/tourStore";
import useUserStore from "@/stores/userStore";
import { useFetchOneGuide } from "./useUsers";

export const useFetchTours = () => {
  const setTours = useTourStore((state) => state.setTours);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with the actual endpoint for fetching tours
      const response = await axios.get<ResponseDTO>(`/api/tours`);
      
      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      console.log('Tours', response.data.data as TourDTO[]);
      // Persist the fetched tours in Zustand store
      setTours(response.data.data as TourDTO[]);
    } catch (err) {
      console.error("Error: ", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  return { fetchTours, loading, error };
};

export const useFetchOneTour = () => {
  const setCurrentTour = useTourStore((state) => state.setCurrentTour);
  const { guides } = useUserStore();
  const { fetchOneGuide } = useFetchOneGuide();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOneTour = async (tourId: string) => {
    setLoading(true);
    setError(null);
    console.log("Fetching one tour ", tourId);
    try {
      // Replace with the actual endpoint for fetching tours
      const response = await axios.get<ResponseDTO>(`/api/tours/${tourId}`);
      
      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      // Persist the fetched tours in Zustand store
      const tour: TourDTO = response.data.data as TourDTO;
      setCurrentTour(tour);

      // fetch tour guide if guide does not exist
      if (!guides.get(tour.guide)) {
        await fetchOneGuide(tour.guide);
      }

    } catch (err) {
      console.error("Error: ", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  return { fetchOneTour, loading, error };
};

