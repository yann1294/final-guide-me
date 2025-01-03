import { PackageDTO } from "@/dto/package.dto";  // Assuming PackageDTO is the data structure you're using for packages
import { TourDTO } from "@/dto/tour.dto";
import { create } from "zustand";

interface PackageStore {
  packages: PackageDTO[];  // Array to store all the packages
  tours: Map<string, TourDTO[]>; // Map to store tours for each package
  currentPackage: PackageDTO | null;

  setPackages: (packages: PackageDTO[]) => void;   // Set all packages from an external source (e.g., API)
  addPackage: (pkg: PackageDTO) => void;            // Add a new package
  updatePackage: (updatedPkg: PackageDTO) => void;  // Update an existing package
  cancelPackage: (id: string) => void;              // Cancel a package by its ID
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

  // Add a new package
  addPackage: (pkg: PackageDTO) =>
    set((state) => ({ packages: [...state.packages, pkg] })),

  // Update an existing package
  updatePackage: (updatedPkg: PackageDTO) =>
    set((state) => ({
      packages: state.packages.map((pkg) =>
        pkg.id === updatedPkg.id ? updatedPkg : pkg
      ),
    })),

  // Cancel (remove) a package by its id
  cancelPackage: (id: string) =>
    set((state) => ({
      packages: state.packages.filter((pkg) => pkg.id !== id),
    })),

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
