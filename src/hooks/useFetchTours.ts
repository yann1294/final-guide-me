import useSWR from "swr";
import axios from "axios";
import useGlobalStore from "@/store/globalStore";
import { ResponseDTO } from "@/dto/helper.dto";
import { TourDTO } from "@/dto/tour.dto";

const fetcher = (url: string) => axios.get<ResponseDTO>(url).then((res) => res.data);

export const useFetchTours = () => {
  const setTours = useGlobalStore((state) => state.setTours);
  const { data, error } = useSWR("http://localhost:3000/tours", fetcher, {
    onSuccess: () => setTours(data?.data as TourDTO[]),
  });

  return {
    tours: data,
    isLoading: !data && !error,
    isError: error,
  };
};