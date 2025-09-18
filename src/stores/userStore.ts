import { create } from "zustand";
import axios from "axios";
import { GuideDTO } from "@/dto/guide.dto"; // Assuming GuideDTO is the data structure for guides
import { TouristDTO } from "@/dto/tourist.dto";

interface UserStore {
  tourGuides: Map<string, GuideDTO>; // Map to store guides by their guideId
  guides: GuideDTO[];
  tourists: TouristDTO[];
  guidesTotal: number; // NEW

  setTourGuides: (tourGuides: GuideDTO) => void; // Set guides
  setGuides: (tourGuides: GuideDTO[]) => void; // Set guides
  setTourists: (tourGuides: TouristDTO[]) => void; // Set guides
  setGuidesTotal: (n: number) => void; // NEW
  updateGuide: (guide: GuideDTO) => void; // Update a guide
  updateTourist: (tourist: TouristDTO) => void; // Update a tourist
}

const useUserStore = create<UserStore>((set) => ({
  tourGuides: new Map<string, GuideDTO>(), // Initialize with an empty map of guides
  guides: [],
  tourists: [],
  guidesTotal: 0, // Initialize guidesTotal to 0,

  // Set guides in the store
  setGuidesTotal: (n: number) =>
    set((state) => {
      return { guidesTotal: n };
    }),
  setTourGuides: (tourGuides: GuideDTO) =>
    set((state) => {
      const newGuides = new Map(state.tourGuides);
      newGuides.set(tourGuides.uid as string, tourGuides);
      return { tourGuides: newGuides };
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
      const nextMap = new Map(state.tourGuides);
      nextMap.set(guide.uid as string, guide);

      const inArray = state.guides.some((g) => g.uid === guide.uid);
      const nextArray = inArray
        ? state.guides.map((g) =>
            g.uid === guide.uid ? { ...g, ...guide } : g,
          )
        : [...state.guides, guide];

      return { tourGuides: nextMap, guides: nextArray };
    }),

  // optional: call this after a brand-new guide registers
  addGuide: (guide: GuideDTO) =>
    set((state) => ({
      tourGuides: new Map(state.tourGuides).set(guide.uid as string, guide),
      guides: state.guides.some((g) => g.uid === guide.uid)
        ? state.guides
        : [...state.guides, guide],
    })),

  // Update a tourist in the store
  updateTourist: (tourist: TouristDTO) =>
    set((state) => {
      return {
        tourists: state.tourists.map((t) =>
          t.uid === tourist.uid ? tourist : t,
        ),
      };
    }),
}));

export default useUserStore;
