import { GuideDTO } from "@/dto/guide.dto";
import { ResponseDTO } from "@/dto/helper.dto";
import { PackageDTO } from "@/dto/package.dto";
import useGuideStore from "@/stores/guidesStore";
import axios from "axios";
import { useState } from "react";

export const useFetchOneGuide = () => {
    const setGuides = useGuideStore((state) => state.setGuides);
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
        setGuides([response.data.data] as GuideDTO[]);
      } catch (err) {
        console.error("Error: ", err);
        setError(err instanceof Error ? err.message : 'Failed to fetch guides');
      } finally {
        setLoading(false);
      }
    };
  
    return { fetchOneGuide, loading, error };
  };