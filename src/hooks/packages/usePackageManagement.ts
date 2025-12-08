import { useEffect, useState } from "react";
import useTourStore from "@/stores/tourStore";
import useUserStore from "@/stores/userStore";
import {
  useCreateOneTour,
  useFetchOneTour,
  useFetchTours,
  useUpdateOneTour,
} from "../tours/useTours";
import { emptyPackageObject } from "@/lib/utils/emptyObjects";
import { TourDTO } from "@/dto/tour.dto";
import { useFetchGuides } from "../useUsers";
import { generateUpdatedData } from "@/lib/utils/formInputHandlers";
import usePackageStore from "@/stores/packageStore";
import { PackageDTO } from "@/dto/package.dto";
import {
  useCreateOnePackage,
  useFetchOnePackage,
  useFetchPackageTours,
  useUpdateOnePackage,
  useUpdatePackageTours,
} from "./usePackages";

/**
 * Custom hook for managing tours, supporting creation and editing/viewing.
 * @param {"new" | "edit/view"} origin - Determines if the hook is used for creating or editing/viewing tours.
 * @returns {Object} State and handlers for managing tours.
 */
export const usePackageManagement = (origin: "new" | "edit/view") => {
  // Access and manage tour-related state from the store
  // const { currentPackage, toursByPackage: packageTours } = usePackageStore();
  const currentPackage = usePackageStore((s) => s.currentPackage);
  const toursByPackage = usePackageStore((s) => s.toursByPackage);
  const setPackageTours = usePackageStore((s) => s.setPackageTours);
  const [selectedTours, setSelectedTours] = useState<TourDTO[]>([]);

  // Fetch guide data and manage user state
  const { fetchGuides } = useFetchGuides();
  const { guides } = useUserStore();

  // fetch tour data
  const { fetchTours } = useFetchTours();
  const { tours } = useTourStore();

  // Fetch and manage specific tour data
  const { fetchOnePackage, loading } = useFetchOnePackage();

  // Manage tour creation state and errors
  const {
    updateOnePackage,
    loading: isUpdatingPackage,
    error: updatePackageError,
  } = useUpdateOnePackage();
  const {
    createOnePackage,
    loading: isCreatingPackage,
    error: createPackageError,
  } = useCreateOnePackage();
  const { fetchPackageTours } = useFetchPackageTours();

  // Local state for managing the tour object
  const [pkg, setPackage] = useState<PackageDTO>(emptyPackageObject);

  // State for tracking the current action (creating, updating, or idle)
  const [action, setAction] = useState<"creating" | "updating" | "nothing">(
    "nothing",
  );

  // keeps track of fields that have been updated
  const [updatedPackageFields, setUpdatedPackageFields] = useState<Set<string>>(
    new Set(),
  );

  const {
    updatePackageTours,
    status: toursStatus, // "idle" | "saving" | "success" | "error"
    loading: isSavingTours,
    error: saveToursError,
  } = useUpdatePackageTours();

  // Fetch guides and current tour when the component mounts
  useEffect(() => {
    if (guides.length === 0) fetchGuides();
    if (!currentPackage && origin !== "new")
      fetchOnePackage(window.location.pathname.split("/").pop()!);
  }, [fetchGuides, fetchOnePackage, guides, currentPackage, origin]);

  useEffect(() => {
    if (!currentPackage?.id) {
      setSelectedTours([]);
      return;
    }
    setSelectedTours(toursByPackage[currentPackage.id] ?? []);
  }, [currentPackage?.id, toursByPackage]);

  // Synchronize local state with the current tour for editing/viewing mode
  useEffect(() => {
    if (origin === "edit/view" && currentPackage) {
      setPackage(currentPackage);
    } else {
      setPackage(currentPackage ?? emptyPackageObject);
    }

    // fetch tours if tours list is empty
    if (tours.length === 0) fetchTours();

    // fetch package tours
    if (currentPackage) {
      if (currentPackage?.id) {
        fetchPackageTours(currentPackage.id);
      }
    }
  }, [currentPackage, origin]);

  // update package tours
  const saveTours = async (tourIds: string[]) => {
    if (!currentPackage?.id) {
      alert("Please save the package first");
      return;
    }

    setAction("updating"); // optional banner/spinner on the page

    try {
      // ✅ ONLY tours go through this endpoint
      await updatePackageTours(currentPackage.id, tourIds);

      // pull fresh docs for this package
      await fetchPackageTours(currentPackage.id);

      // reflect on screen immediately (pick tours by id from global tours list)
      const idSet = new Set(tourIds);
      setSelectedTours(
        tours.filter(
          (t): t is TourDTO & { id: string } =>
            typeof t.id === "string" && idSet.has(t.id),
        ),
      );
    } finally {
      // let the hook’s `toursStatus` drive the “Saved ✓ / Failed” UI
      setTimeout(() => setAction("nothing"), 1200);
    }
  };

  // Function to handle saving the tour (create or update)
  // usePackageManagement.ts
  const savePackageHandler = async () => {
    const form = document.getElementById("create-tour-form") as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (origin === "new") {
      if (pkg.guide.trim() !== "") {
        setAction("creating");
        await createOnePackage(pkg);
        setAction("nothing");
      } else {
        alert("Please select a guide");
      }
      return;
    }

    // --- EDIT / UPDATE PATH ---
    if (!pkg.id) {
      alert("Missing package id");
      return;
    }

    // Only include fields we expect for “details” updates (not tours)
    const allowed = new Set([
      "name",
      "location",
      "price",
      "durationDays",
      "discount",
      "numberOfSeats",
      "description",
      "isAvailable",
      "date",
      "images",
      "guide",
    ]);

    const partial: Partial<PackageDTO> = {};
    updatedPackageFields.forEach((field) => {
      if (allowed.has(field)) {
        (partial as any)[field] = (pkg as any)[field];
      }
    });

    // Normalize date to string if needed (backend uses IsDateString)
    if (partial.date instanceof Date) {
      (partial as any).date = partial.date.toISOString();
    }

    if (Object.keys(partial).length === 0) return;

    try {
      setAction("updating");
      await updateOnePackage(pkg.id, partial); // <-- PATCH with id
      setUpdatedPackageFields(new Set());
      setAction("nothing");
    } catch {
      setAction("nothing");
    }
  };

  return {
    updatedPackageFields,
    setUpdatedPackageFields,
    savePackageHandler,
    pkg,
    setPackage,
    action,
    setAction,
    isCreatingPackage,
    isUpdatingPackage,
    createPackageError,
    updatePackageError,
    fetchGuides,
    guides,
    loading,
    tours,
    saveTours,
    saveToursStatus: toursStatus,
    selectedTours,
    setSelectedTours,
  };
};
