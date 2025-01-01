import { PackageDTO } from "@/dto/package.dto";  // Assuming PackageDTO is the data structure you're using for packages
import { create } from "zustand";

interface PackageStore {
  packages: PackageDTO[];  // Array to store all the packages

  setPackages: (packages: PackageDTO[]) => void;   // Set all packages from an external source (e.g., API)
  addPackage: (pkg: PackageDTO) => void;            // Add a new package
  updatePackage: (updatedPkg: PackageDTO) => void;  // Update an existing package
  cancelPackage: (id: string) => void;              // Cancel a package by its ID
}

// Define the Zustand store
const usePackageStore = create<PackageStore>((set) => ({
  packages: [], // Initialize with an empty array

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
}));

export default usePackageStore;
