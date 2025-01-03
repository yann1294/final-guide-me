import { create } from "zustand";
import axios from "axios";
import { GuideDTO } from "@/dto/guide.dto"; // Assuming GuideDTO is the data structure for guides

interface GuideStore {
  guides: Map<string, GuideDTO>;  // Map to store guides by their guideId
  setGuides: (guides: GuideDTO[]) => void;  // Set guides
  updateGuide: (guide: GuideDTO) => void;   // Update a guide
  removeGuide: (guideId: string) => void;   // Remove a guide by guideId
}

const useGuideStore = create<GuideStore>((set) => ({
  guides: new Map<string, GuideDTO>(), // Initialize with an empty map of guides

  // Set guides in the store
  setGuides: (guides: GuideDTO[]) =>
    set((state) => {
      const newGuides = new Map(state.guides);
      guides.forEach((guide) => newGuides.set(guide.uid as string, guide)); // Set each guide
      return { guides: newGuides };
    }),

  // Update an existing guide
  updateGuide: (guide: GuideDTO) =>
    set((state) => {
      const newGuides = new Map(state.guides);
      newGuides.set(guide.uid as string, guide);  // Update the guide
      return { guides: newGuides };
    }),

  // Remove a guide by guideId
  removeGuide: (guideId: string) =>
    set((state) => {
      const newGuides = new Map(state.guides);
      newGuides.delete(guideId);  // Remove the guide from the map
      return { guides: newGuides };
    })
}));

export default useGuideStore;
