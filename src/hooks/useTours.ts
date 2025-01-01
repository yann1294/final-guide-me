import useSWR from "swr";
import axios from "axios";
import useGlobalStore from "@/stores/globalStore";
import { ResponseDTO } from "@/dto/helper.dto";
import { TourDTO } from "@/dto/tour.dto";
import { useState } from "react";
import useTourStore from "@/stores/tourStore";

// const fetcher = (url: string) => axios.get<ResponseDTO>(url).then((res) => res.data);

// export const useFetchTours = () => {
//   const setTours = useGlobalStore((state) => state.setTours);
//   const { data, error } = useSWR("http://localhost:3000/tours", fetcher, {
//     onSuccess: () => setTours(data?.data as TourDTO[]),
//   });

//   return {
//     tours: data,
//     isLoading: !data && !error,
//     isError: error,
//   };
// };

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
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  return { fetchTours, loading, error };
};
