import axios from "axios";
import { ResponseDTO } from "@/dto/helper.dto";
import { PackageDTO } from "@/dto/package.dto";
import { useState } from "react";
import usePackageStore from "@/stores/packageStore";
import { TourDTO } from "@/dto/tour.dto";
import useUserStore from "@/stores/userStore";
import { useFetchOneGuide } from "../useUsers";

export const useFetchPackages = () => {
  const setPackages = usePackageStore((state) => state.setPackages);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with the actual endpoint for fetching packages
      const response = await axios.get<ResponseDTO>(`/api/packages`);
      
      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      
      // Persist the fetched packages in Zustand store
      setPackages(response.data.data as PackageDTO[]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  return { fetchPackages, loading, error };
};

export const useFetchPackageTours = () => {
  const setPackageTours = usePackageStore((state) => state.setPackageTours);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackageTours = async (packageId: string) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with the actual endpoint for fetching packages
      const response = await axios.get<ResponseDTO>(`/api/packages/${packageId}/tours`);
      
      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      
      // Persist the fetched packages in Zustand store
      setPackageTours(packageId, response.data.data as TourDTO[]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  return { fetchPackageTours, loading, error };
};

export const useFetchOnePackage = () => {
  const setCurrentPackage = usePackageStore((state) => state.setCurrentPackage);
  const { tourGuides: guides } = useUserStore();
  const { fetchOneGuide } = useFetchOneGuide();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOnePackage = async (packageId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with the actual endpoint for fetching packages
      const response = await axios.get<ResponseDTO>(`/api/packages/${packageId}`);
      
      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      // Persist the fetched tours in Zustand store
      const pkg = response.data.data as PackageDTO;
      setCurrentPackage(pkg);

      // fetch tour guide if guide does not exist
      if (!guides.get(pkg.guide)) {
        await fetchOneGuide(pkg.guide);
      }
      
    } catch (err) {
      console.error("Error: ", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  return { fetchOnePackage, loading, error };
};

export const useCreateOnePackage = () => {
  const { addPackage, setCurrentPackage } = usePackageStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createOnePackage = async (pkg: PackageDTO) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Create One Package: ")
      // convert activities to object
      let data: any = Object.assign({}, pkg);
      // data['activities'] = Object.fromEntries(tour.activities.entries());
      data['tours'] = {};

      // Replace with the actual endpoint for fetching tours
      const response = await axios.post<ResponseDTO>(`/api/packages`, JSON.stringify(data));
      console.log(response.data)

      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        setError(response.data.message);
        throw new Error(response.data.message);
      }

      // add tour to tours
      pkg.id = (response.data.data as string).split("/")[1];
      addPackage(pkg);
      setCurrentPackage(pkg);
      console.log(response.data)
    } catch (err: any) {
      // console.error("Error: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createOnePackage, loading, error };
};

export const useUpdateOnePackage = () => {
  const { updatePackage, currentPackage, setCurrentPackage } = usePackageStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"updated" | "initial" | "failed">("initial");

  const updateOnePackage = async (pkg: Partial<PackageDTO>) => {
    setLoading(true);
    setError(null);

    try {
      // convert activities to object
      let data: any = Object.assign({}, pkg);

      // processing activities if it exist
      if (pkg.tours) {
        data['tours'] = pkg.tours;
      }

      // Replace with the actual endpoint for fetching tours
      const response = await axios.patch<ResponseDTO>(`/api/packages/${pkg.id}`, data);

      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.log(JSON.parse(response.data.message))
        setError(response.data.message);
        setStatus("failed");
        throw new Error(response.data.message);
      }

      console.log(response);
      setStatus("updated");
      updatePackage({...currentPackage, ...pkg} as PackageDTO);
      setCurrentPackage({...currentPackage, ...pkg} as PackageDTO);
    } catch (err: any) {
      // console.error("Error: ", err);
      setError(err);
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  return { updateOnePackage, loading, error, status };
};

export const useDeleteOnePackage = () => {
  const { deletePackage } = usePackageStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteOnePackage = async (pkg: Partial<PackageDTO>) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Delete pkg");

      // Replace with the actual endpoint for fetching tours
      const response = await axios.delete<ResponseDTO>(`/api/packages/${pkg.id}`);

      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.log(JSON.parse(response.data.message))
        setError(response.data.message);
        throw new Error(response.data.message);
      }

      deletePackage(pkg as PackageDTO);
      console.log(response)
    } catch (err: any) {
      // console.error("Error: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteOnePackage, loading, error };
};
