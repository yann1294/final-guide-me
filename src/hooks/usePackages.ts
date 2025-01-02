import axios from "axios";
import { ResponseDTO } from "@/dto/helper.dto";
import { PackageDTO } from "@/dto/package.dto";
import { useState } from "react";
import usePackageStore from "@/stores/packageStore";
import { TourDTO } from "@/dto/tour.dto";

export const useCreatePackages = () => {
  const addPackage = usePackageStore((state) => state.addPackage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPackage = async (newPackage: PackageDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ResponseDTO>('/bookings', newPackage);
      
      // check if the response.data.status is 'success'
      if (response.data.status !== 'success') {
        throw new Error(response.data.message);
      }

      // update the booking id with the one returned from the server
      newPackage.id = response.data.data as string;

      // Persist the new booking in Zustand store
      addPackage(newPackage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return { createPackage, loading, error };
};

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

      console.log('response.data.data', response.data.data);
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

      console.log('Package tour: ', response.data.data);
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

