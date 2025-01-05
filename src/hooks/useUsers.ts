import { GuideDTO } from "@/dto/guide.dto";
import { ResponseDTO } from "@/dto/helper.dto";
import { PackageDTO } from "@/dto/package.dto";
import { TouristDTO } from "@/dto/tourist.dto";
import useUserStore from "@/stores/userStore";
import axios from "axios";
import { useState } from "react";

export const useFetchOneGuide = () => {
    const setTourGuides = useUserStore((state) => state.setTourGuides);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchOneGuide = async (guideId: string) => {
      setLoading(true);
      setError(null);
      console.log("Fetching one guide ", guideId);
      try {
        // Replace with the actual endpoint for fetching packages
        const response = await axios.get<ResponseDTO>(`/api/users/guides/${guideId}`);
        
        // Check if the response status is 'success'
        if (response.data.status !== 'success') {
          console.error(response.data);
          throw new Error(response.data.message);
        }
  
        // Persist the fetched tours in Zustand store
        setTourGuides(response.data.data as Map<string, GuideDTO>);
      } catch (err) {
        console.error("Error: ", err);
        setError(err instanceof Error ? err.message : 'Failed to fetch guides');
      } finally {
        setLoading(false);
      }
    };
  
    return { fetchOneGuide, loading, error };
  };

  // get all guides
export const useFetchGuides = () => {
    const setGuides = useUserStore((state) => state.setGuides);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchGuides = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with the actual endpoint for fetching guides
        const response = await axios.get<ResponseDTO>(`/api/users/guides`);
        
        // Check if the response status is 'success'
        if (response.data.status !== 'success') {
          console.error(response.data);
          throw new Error(response.data.message);
        }
  
        // Persist the fetched guides in Zustand store
        setGuides(response.data.data as GuideDTO[]);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to fetch guides');
      } finally {
        setLoading(false);
      }
    };
  
    return { fetchGuides, loading, error };
  };

  // fetch all tourists
export const useFetchTourists = () => {
    const setTourists = useUserStore((state) => state.setTourists);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchTourists = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with the actual endpoint for fetching tourists
        const response = await axios.get<ResponseDTO>(`/api/users/tourists`);
        
        // Check if the response status is 'success'
        if (response.data.status !== 'success') {
          console.error(response.data);
          throw new Error(response.data.message);
        }
  
        console.log("Tourists: ", response.data.data);
        // Persist the fetched tourists in Zustand store
        setTourists(response.data.data as TouristDTO[]);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tourists');
      } finally {
        setLoading(false);
      }
    };
  
    return { fetchTourists, loading, error };
  };

  // fetch one tourist
export const useFetchOneTourist = () => {
    const setTourists = useUserStore((state) => state.setTourists);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchOneTourist = async (touristId: string) => {
      setLoading(true);
      setError(null);
      console.log("Fetching one tourist ", touristId);
      try {
        // Replace with the actual endpoint for fetching packages
        const response = await axios.get<ResponseDTO>(`/api/users/tourists/${touristId}`);
        
        // Check if the response status is 'success'
        if (response.data.status !== 'success') {
          console.error(response.data);
          throw new Error(response.data.message);
        }
  
        // Persist the fetched tours in Zustand store
        setTourists([response.data.data] as TouristDTO[]);
      } catch (err) {
        console.error("Error: ", err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tourists');
      } finally {
        setLoading(false);
      }
    };
  
    return { fetchOneTourist, loading, error };
  };