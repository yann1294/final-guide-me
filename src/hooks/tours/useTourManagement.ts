import { useEffect, useState } from "react";
import useTourStore from "@/stores/tourStore";
import useUserStore from "@/stores/userStore";
import {
  useCreateOneTour,
  useFetchOneTour,
  useUpdateOneTour,
} from "./useTours";
import { emptyTourObject } from "@/lib/utils/emptyObjects";
import { TourDTO } from "@/dto/tour.dto";
import { useFetchGuides } from "../useUsers";
import { generateUpdatedData } from "@/lib/utils/formInputHandlers";

/**
 * Custom hook for managing tours, supporting creation and editing/viewing.
 * @param {"new" | "edit/view"} origin - Determines if the hook is used for creating or editing/viewing tours.
 * @returns {Object} State and handlers for managing tours.
 */
export const useTourManagement = (origin: "new" | "edit/view") => {
  // Access and manage tour-related state from the store
  const { currentTour, setCurrentTour, updateTour } = useTourStore();

  // Fetch guide data and manage user state
  const { fetchGuides } = useFetchGuides();
  const { guides } = useUserStore();

  // Fetch and manage specific tour data
  const { fetchOneTour, loading: fetchingTourData } = useFetchOneTour();

  // Manage tour creation state and errors
  const {
    updateOneTour,
    loading: isUpdatingTour,
    error: updateTourError,
  } = useUpdateOneTour();
  const {
    createOneTour,
    loading: isCreatingTour,
    error: createTourError,
  } = useCreateOneTour();

  // Local state for managing the tour object
  const [tour, setTour] = useState<TourDTO>(emptyTourObject);

  // State for tracking the current action (creating, updating, or idle)
  const [action, setAction] = useState<"creating" | "updating" | "nothing">(
    "nothing",
  );

  // keeps track of fields that have been updated
  const [updatedTourFields, setUpdatedTourFields] = useState<Set<string>>(
    new Set(),
  );

  // Fetch guides and current tour when the component mounts
  useEffect(() => {
    if (guides.length === 0)
      fetchGuides({
        page: 1,
        limit: 12,
        status: "approved",
      });
    if (!currentTour && origin !== "new")
      fetchOneTour(window.location.pathname.split("/").pop()!);
  }, [fetchGuides, fetchOneTour, guides, currentTour, origin]);

  // Synchronize local state with the current tour for editing/viewing mode
  useEffect(() => {
    if (origin === "edit/view" && currentTour) {
      setTour(currentTour);
    } else {
      setTour(currentTour ?? emptyTourObject);
    }
  }, [currentTour, origin]);

  // Function to handle saving the tour (create or update)
  const saveTourHandler = () => {
    const form = document.getElementById("create-tour-form") as HTMLFormElement;

    if (form.checkValidity()) {
      if (origin === "new") {
        if (tour.guide.trim() !== "") {
          createOneTour(tour);
          setAction("creating");
        } else {
          alert("Please select a guide");
        }
      } else {
        console.log(updatedTourFields);
        let newTour: Partial<TourDTO> = {};
        newTour = generateUpdatedData("tour", updatedTourFields, tour);
        newTour["id"] = currentTour?.id;
        updateOneTour(newTour);
        setAction("updating");
        updateTour(tour);
        setCurrentTour(tour);
      }
    } else {
      form.reportValidity();
    }
  };

  return {
    updatedTourFields,
    setUpdatedTourFields,
    saveTourHandler,
    tour,
    setTour,
    action,
    setAction,
    isCreatingTour,
    isUpdatingTour,
    createTourError,
    updateTourError,
    fetchGuides,
    guides,
    fetchingTourData,
  };
};
