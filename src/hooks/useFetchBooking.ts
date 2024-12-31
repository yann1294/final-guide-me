import useSWR from "swr";
import axios from "axios";
import useGlobalStore from "@/store/globalStore";
import { ResponseDTO } from "@/dto/helper.dto";

const fetcher = (url: string) => axios.get<ResponseDTO>(url).then((res) => res.data);

export const useFetchBookings = () => {
    const setBookings = useGlobalStore((state) => state.setBookings);
    const { data, error } = useSWR("http://localhost:3000/bookings", fetcher);
  
    return {
      bookings: data,
      isLoading: !data && !error,
      isError: error,
    };
  };
  