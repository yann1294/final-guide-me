import { create } from "zustand";
import axios from "axios";
import { GuideDTO } from "@/dto/guide.dto"; // Assuming GuideDTO is the data structure for guides
import { TouristDTO } from "@/dto/tourist.dto";

interface GuideStore {
  tourGuides: Map<string, GuideDTO>;  // Map to store guides by their guideId
  guides: GuideDTO[]
  tourists: TouristDTO[]

  setTourGuides: (tourGuides: GuideDTO) => void;  // Set guides
  setGuides: (tourGuides: GuideDTO[]) => void;  // Set guides
  setTourists: (tourGuides: TouristDTO[]) => void;  // Set guides
}

const useGuideStore = create<GuideStore>((set) => ({
  tourGuides: new Map<string, GuideDTO>(), // Initialize with an empty map of guides
  guides: [],
  tourists: [],

  // Set guides in the store
  setTourGuides: (tourGuides: GuideDTO) =>
    set((state) => {
      const newGuides = new Map(state.tourGuides);
      newGuides.set(tourGuides.uid as string, tourGuides)
      return { tourGuides: newGuides  };
    }),

  setGuides: (guides: GuideDTO[]) =>
    set((state) => {
      return { guides: [...state.guides, ...guides] };
    }),

  setTourists: (tourists: TouristDTO[]) =>
    set((state) => {
      return { tourists: [...state.tourists, ...tourists] };
    })
}));

export default useGuideStore;
