import useSWR from "swr";
import axios from "axios";
import { ResponseDTO } from "@/dto/helper.dto";
import { ActivityDTO, TourDTO } from "@/dto/tour.dto";
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
  const { tourGuides: guides } = useUserStore();
  const { fetchOneGuide } = useFetchOneGuide();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOneTour = async (tourId: string) => {
    setLoading(true);
    setError(null);
    
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
      let activities = new Map<number, ActivityDTO>(
        Object.entries(tour.activities).map(([key, value]) => [parseInt(key), value])
      );
      tour.activities = activities;
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

export const useCreateOneTour = () => {
  const { addTour } = useTourStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createOneTour = async (tour: TourDTO) => {
    setLoading(true);
    setError(null);
    
    try {
      // convert activities to object
      let data: any = Object.assign({}, tour);
      data['activities'] = Object.fromEntries(tour.activities.entries());
      // Replace with the actual endpoint for fetching tours
      const response = await axios.post<ResponseDTO>(`/api/tours`, JSON.stringify(data));

      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        setError(response.data.message);
        throw new Error(response.data.message);
      }

      // add tour to tours
      tour.id = response.data.data as string;
      addTour(tour);
      console.log(response.data)
    } catch (err: any) {
      // console.error("Error: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createOneTour, loading, error };
};

export const useUpdateOneTour = () => {
  const { addTour } = useTourStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateOneTour = async (tour: Partial<TourDTO>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with the actual endpoint for fetching tours
      const response = await axios.patch<ResponseDTO>(`/api/tours/${tour.id}`, tour);

      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.log(JSON.parse(response.data.message))
        setError(response.data.message);
        throw new Error(response.data.message);
      }

      console.log(response)
    } catch (err: any) {
      // console.error("Error: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateOneTour, loading, error };
};