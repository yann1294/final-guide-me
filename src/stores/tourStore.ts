import { TourDTO } from "@/dto/tour.dto";
import { create } from "zustand";

// keep only setTours, addTour, and setCurrentTour
interface TourStore {
  tours: TourDTO[];  // Array to store all the tours
  currentTour: TourDTO | null;  // Store the current tour being viewed

  setTours: (tours: TourDTO[]) => void;   // Set all tours from an external source (e.g., API)
  addTour: (tour: TourDTO) => void;       // Add a new tour
  setCurrentTour: (tour: TourDTO) => void; // Set the current tour being viewed
  updateTour: (tour: TourDTO) => void
}

// Define the Zustand store
const useTourStore = create<TourStore>((set) => ({
  tours: [], // Initialize with an empty array
  currentTour: null, // Initialize with null

  // Set all tours
  setTours: (tours: TourDTO[]) => set({ tours }),

  // Add a new tour
  addTour: (tour: TourDTO) =>
    set((state) => ({ tours: [...state.tours, tour] })),

  // Set the current tour being viewed
  setCurrentTour: (tour: TourDTO) => set({ currentTour: tour }),
  updateTour: (tour: TourDTO) => set((state) => {
    let newTours: TourDTO[] = state.tours.filter((t) => t.id != tour.id);

    return { tours: [...newTours, tour ]}
  }),
}));

export default useTourStore;
