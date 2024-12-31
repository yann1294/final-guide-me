// import useSWR from "swr";
// import axios from "axios";
// import useGlobalStore from "@/store/globalStore";
// import { ResponseDTO } from "@/dto/helper.dto";

// const fetcher = (url: string) => axios.get<ResponseDTO>(url).then((res) => res.data);

// export const useFetchGuides = () => {
//   const setGuides = useGlobalStore((state) => state.setGuides);
//   const { data, error } = useSWR("http://localhost:3000/guides", fetcher, {
//     onSuccess: setGuides,
//   });

//   return {
//     guides: data,
//     isLoading: !data && !error,
//     isError: error,
//   };
// };