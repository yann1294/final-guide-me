import { create } from "zustand";
import { GuideDTO } from "@/dto/guide.dto"; // Assuming GuideDTO is the data structure for guides
import { TouristDTO } from "@/dto/tourist.dto"; // Assuming TouristDTO is the data structure for tourists

interface UserStore {
  tourGuides: Map<string, GuideDTO>;
  tourists: TouristDTO[];
  guides: GuideDTO[]; // List to store guides
  setTourGuides: (tourGuides: Map<string, GuideDTO>) => void;
  setTourists: (tourists: TouristDTO[]) => void;
  setGuides: (guides: GuideDTO[]) => void; // Set guides
}

const useUserStore = create<UserStore>((set) => ({
  tourGuides: new Map<string, GuideDTO>(),
  tourists: [],
  guides: [], // Initialize with an empty list of guides

  setTourGuides: (tourGuides: Map<string, GuideDTO>) =>
    set(() => {
      return { tourGuides };
    }),

  setTourists: (tourists: TouristDTO[]) =>
    set(() => {
      return { tourists };
    }),

  setGuides: (guides: GuideDTO[]) =>
    set(() => {
      return { guides }; // Set the list of guides
    })
}));

export default useUserStore;