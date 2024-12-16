// hooks/useFetchData.ts
import useSWR from "swr";
import axios from "axios";
import useGlobalStore from "@/store/globalStore";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

export const useFetchTours = () => {
  const setTours = useGlobalStore((state) => state.setTours);
  const { data, error } = useSWR("http://localhost:3000/tours", fetcher, {
    onSuccess: setTours,
  });

  return {
    tours: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const useFetchPackages = () => {
  const setPackages = useGlobalStore((state) => state.setPackages);
  const { data, error } = useSWR("http://localhost:3000/packages", fetcher, {
    onSuccess: setPackages,
  });

  return {
    packages: data,
    isLoading: !data && !error,
    isError: error,
  };
};

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
