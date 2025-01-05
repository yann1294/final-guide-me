import { PackageDTO } from "@/dto/package.dto";  // Assuming PackageDTO is the data structure you're using for packages
import { TourDTO } from "@/dto/tour.dto";
import { create } from "zustand";

interface PackageStore {
  packages: PackageDTO[];  // Array to store all the packages
  tours: Map<string, TourDTO[]>; // Map to store tours for each package
  currentPackage: PackageDTO | null;

  setPackages: (packages: PackageDTO[]) => void;   // Set all packages from an external source (e.g., API)
  setPackageTours: (packageId: string, tour: TourDTO[]) => void;
  setCurrentPackage: (pkg: PackageDTO) => void;     // Set the current tour being viewed
}

// Define the Zustand store
const usePackageStore = create<PackageStore>((set) => ({
  packages: [], // Initialize with an empty array
  tours: new Map<string, TourDTO[]>(),
  currentPackage: null,

  // Set all packages
  setPackages: (packages: PackageDTO[]) => set({ packages }),

  // Set tours for a specific package
  setPackageTours: (packageId: string, tours: TourDTO[]) =>
    set((state) => {
      console.log("Existing packages", state.tours.keys())
      const newTours = new Map(state.tours);  // Create a new Map to trigger re-render
      newTours.set(packageId, tours);
      console.log("After addition packages", newTours.keys())
      return { tours: newTours };
    }),

  // Set the current package
  setCurrentPackage: (pkg: PackageDTO) => set({ currentPackage: pkg }),
}));

export default usePackageStore;
