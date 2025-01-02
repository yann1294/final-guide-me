import { TourDTO } from "@/dto/tour.dto";
import { create } from "zustand";

interface TourStore {
  tours: TourDTO[];  // Array to store all the tours
  currentTour: TourDTO | null;  // Store the current tour being viewed

  setTours: (tours: TourDTO[]) => void;   // Set all tours from an external source (e.g., API)
  addTour: (tour: TourDTO) => void;            // Add a new tour
  updateTour: (updatedTour: TourDTO) => void;  // Update an existing tour
  cancelTour: (id: string) => void;              // Cancel a tour by its ID
  setCurrentTour: (tour: TourDTO) => void;       // Set the current tour being viewed
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

  // Update an existing tour
  updateTour: (updatedTour: TourDTO) =>
    set((state) => ({
      tours: state.tours.map((tour) =>
        tour.id === updatedTour.id ? updatedTour : tour
      ),
    })),

  // Cancel (remove) a tour by its id
  cancelTour: (id: string) =>
    set((state) => ({
      tours: state.tours.filter((tour) => tour.id !== id),
    })),
    setCurrentTour: (tour: TourDTO) => set({ currentTour: tour }),
}));

export default useTourStore;
