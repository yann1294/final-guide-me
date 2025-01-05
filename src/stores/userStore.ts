import { create } from "zustand";
import { GuideDTO } from "@/dto/guide.dto"; // Assuming GuideDTO is the data structure for guides
import { TouristDTO } from "@/dto/tourist.dto"; // Assuming TouristDTO is the data structure for tourists

interface UserStore {
  guides: Map<string, GuideDTO>;  // Map to store guides by their guideId
  tourists: Map<string, TouristDTO>; // Map to store tourists by their touristId
  setGuides: (guides: GuideDTO[]) => void;  // Set guides
  setTourists: (tourists: TouristDTO[]) => void; // Set tourists
}

const useUserStore = create<UserStore>((set) => ({
  guides: new Map<string, GuideDTO>(), // Initialize with an empty map of guides
  tourists: new Map<string, TouristDTO>(), // Initialize with an empty map of tourists

  // Set guides in the store
  setGuides: (guides: GuideDTO[]) =>
    set((state) => {
      const newGuides = new Map(state.guides);
      guides.forEach((guide) => newGuides.set(guide.uid as string, guide)); // Set each guide
      return { guides: newGuides };
    }),

  // Set tourists in the store
  setTourists: (tourists: TouristDTO[]) =>
    set((state) => {
      const newTourists = new Map(state.tourists);
      tourists.forEach((tourist) => newTourists.set(tourist.uid as string, tourist)); // Set each tourist
      return { tourists: newTourists };
    })
}));

export default useUserStore;