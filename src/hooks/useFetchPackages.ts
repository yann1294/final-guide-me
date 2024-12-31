import useSWR from "swr";
import axios from "axios";
import useGlobalStore from "@/store/globalStore";
import { ResponseDTO } from "@/dto/helper.dto";
import { PackageDTO } from "@/dto/package.dto";

const fetcher = (url: string) => axios.get<ResponseDTO>(url).then((res) => res.data);
export const useFetchPackages = () => {
  const setPackages = useGlobalStore((state) => state.setPackages);
  const { data, error } = useSWR("http://localhost:3000/packages", fetcher, {
    onSuccess: () => setPackages(data?.data as PackageDTO[]),
  });

  return {
    packages: data,
    isLoading: !data && !error,
    isError: error,
  };
};

