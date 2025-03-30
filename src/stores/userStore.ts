import { create } from "zustand";
import axios from "axios";
import { GuideDTO } from "@/dto/guide.dto"; // Assuming GuideDTO is the data structure for guides
import { TouristDTO } from "@/dto/tourist.dto";

interface UserStore {
  tourGuides: Map<string, GuideDTO>;  // Map to store guides by their guideId
  guides: GuideDTO[]
  tourists: TouristDTO[]

  setTourGuides: (tourGuides: GuideDTO) => void;  // Set guides
  setGuides: (tourGuides: GuideDTO[]) => void;  // Set guides
  setTourists: (tourGuides: TouristDTO[]) => void;  // Set guides
  updateGuide: (guide: GuideDTO) => void;  // Update a guide
  updateTourist: (tourist: TouristDTO) => void;  // Update a tourist
}

const useUserStore = create<UserStore>((set) => ({
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
      return { guides: guides };
    }),

  setTourists: (tourists: TouristDTO[]) =>
    set((state) => {
      return { tourists: [...state.tourists, ...tourists] };
    }),

  // Update a guide in the store
  updateGuide: (guide: GuideDTO) =>
    set((state) => {
      const newGuides = new Map(state.tourGuides);
      newGuides.set(guide.uid as string, guide)
      return { tourGuides: newGuides  };
    }),

  // Update a tourist in the store
  updateTourist: (tourist: TouristDTO) =>
    set((state) => {
      return { tourists: state.tourists.map(t => t.uid === tourist.uid ? tourist : t) };
    }),
}));

export default useUserStore;
