import { useEffect, useState } from "react";
import useTourStore from "@/stores/tourStore";
import useUserStore from "@/stores/userStore";
import { useCreateOneTour, useFetchOneTour, useFetchTours, useUpdateOneTour } from "../tours/useTours";
import { emptyPackageObject } from "@/lib/utils/emptyObjects";
import { TourDTO } from "@/dto/tour.dto";
import { useFetchGuides } from "../useUsers";
import { generateUpdatedData } from "@/lib/utils/formInputHandlers";
import usePackageStore from "@/stores/packageStore";
import { PackageDTO } from "@/dto/package.dto";
import { useCreateOnePackage, useFetchOnePackage, useUpdateOnePackage } from "./usePackages";

/**
 * Custom hook for managing tours, supporting creation and editing/viewing.
 * @param {"new" | "edit/view"} origin - Determines if the hook is used for creating or editing/viewing tours.
 * @returns {Object} State and handlers for managing tours.
 */
export const usePackageManagement = (origin: "new" | "edit/view") => {
  // Access and manage tour-related state from the store
  const { currentPackage, setCurrentPackage, updatePackage } = usePackageStore();

  // Fetch guide data and manage user state
  const { fetchGuides } = useFetchGuides();
  const { guides } = useUserStore();

  // fetch tour data
  const { fetchTours } = useFetchTours();
  const { tours } = useTourStore();

  // Fetch and manage specific tour data
  const  { fetchOnePackage, loading } = useFetchOnePackage();

  // Manage tour creation state and errors
  const { updateOnePackage, loading: isUpdatingPackage, error: updatePackageError } = useUpdateOnePackage();
  const { createOnePackage, loading: isCreatingPackage, error: createPackageError } = useCreateOnePackage();

  // Local state for managing the tour object
  const [pkg, setPackage] = useState<PackageDTO>(emptyPackageObject);

  // State for tracking the current action (creating, updating, or idle)
  const [action, setAction] = useState<"creating" | "updating" | "nothing">("nothing");

  // keeps track of fields that have been updated
  const [updatedPackageFields, setUpdatedPackageFields] = useState<Set<string>>(new Set());

  // Fetch guides and current tour when the component mounts
  useEffect(() => {
    if (guides.length === 0) fetchGuides();
    if (!currentPackage && origin !== "new") fetchOnePackage(window.location.pathname.split("/").pop()!);
  }, [fetchGuides, fetchOnePackage, guides, currentPackage, origin]);

  // Synchronize local state with the current tour for editing/viewing mode
  useEffect(() => {
    if (origin === "edit/view" && currentPackage) {
      setPackage(currentPackage);
    } else {
      setPackage(currentPackage ?? emptyPackageObject);
    }

    // fetch tours if tours list is empty
    if (tours.length === 0) fetchTours();
  }, [currentPackage, origin]);

  // update package tours
  const saveTours = async (tours: string[]) => {
    // check whether current package is available
    if (currentPackage) {
      // update the package tours
      updateOnePackage({ id: currentPackage.id, tours: tours } as Partial<PackageDTO>);
    } else {
      // alert user that package is not available
      alert("Please save the package first");
    }
  }

  // Function to handle saving the tour (create or update)
  const savePackageHandler = () => {
    const form = document.getElementById("create-tour-form") as HTMLFormElement;

    if (form.checkValidity()) {
      if (origin === "new") {
        if (pkg.guide.trim() !== "") {
          createOnePackage(pkg);
          setAction("creating");
        } else {
          alert("Please select a guide");
        }
      } else {
      }
    } else {
      form.reportValidity();
    }
  };

  return {
    updatedPackageFields, setUpdatedPackageFields,
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
    saveTours
  };
};
