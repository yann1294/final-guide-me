import { useState, useEffect } from "react";
import { ActivityDTO, TourDTO } from "@/dto/tour.dto";
import { emptyActivityObject } from "@/lib/utils/emptyObjects";
import useTourStore from "@/stores/tourStore";
import { useUpdateOneTour } from "./useTours";

/**
 * Custom hook to manage activity-related state and functionality.
 * @returns {Object} State and handlers for managing activities.
 */
export const useActivityManagement = (origin: "new" | "edit/view") => {
  // State for managing activities
  const [activities, setActivities] = useState<Map<number, ActivityDTO>>(new Map());

  // tour managers
  const { currentTour } = useTourStore();
  const { updateOneTour, loading, error, status } = useUpdateOneTour();


  // State for managing activity type metadata
  const [activityType, setActivityType] = useState<{ type: string; key: number }>({
    type: "normal",
    key: Date.now(),
  });

  // State to track which fields in the activities have been updated
  const [updatedActivitiesFields, setUpdatedActivitiesFields] = useState<Set<string>>(new Set());

  // validates activities form
  const validateForm = (): boolean => {
    const form = document.querySelectorAll(
      '.create-activity-form',
    ) as NodeListOf<HTMLFormElement>;
    let isValid = true;

    // Check if the form is valid (using HTML5 checkValidity)
    form.forEach((form) => {
      if (!form.checkValidity()) {
        form.reportValidity();
        isValid = false;
      }
    });
    return isValid;
  }
  /**
   * Add a new activity to the activity list.
   * @param {ActivityDTO} activity - The activity to add.
   */
  const addActivity = () => {
    if (validateForm()) {
      // Form is valid, proceed with submission or any other action
      const activity = emptyActivityObject;
      activity.id = new Date().getTime();
      setActivities((prev) => new Map(prev).set(activity.id, activity));
    }
  };

  /**
   * Remove an activity by its ID.
   * @param {number} id - The ID of the activity to remove.
   */
  const removeActivity = (id: number) => {
    setActivities((prev) => {
      const updated = new Map(prev);
      updated.delete(id);
      return updated;
    });
  };

  /**
   * Update an existing activity by its ID.
   * @param {number} id - The ID of the activity to update.
   * @param {Partial<ActivityDTO>} updates - The updates to apply.
   */
  const updateActivity = (id: number, updates: Partial<ActivityDTO>) => {
    setActivities((prev) => {
      const updated = new Map(prev);
      const existing = updated.get(id);
      if (existing) {
        updated.set(id, { ...existing, ...updates });
      }
      return updated;
    });
  };

  // Reset the activity state
  const resetActivities = () => {
    setActivities(new Map());
    setUpdatedActivitiesFields(new Set());
  };

  useEffect(() => {
    // Example: Syncing activity state with external data sources if needed
  }, []);

  // Handle change in the input fields
  const handleInputChange = (e: any, key: number) => {
    const target = e.target ?? e.originalEvent?.target;
    const { name, value } = target;
    const [mainKey, subKey] = name.split('.'); // Handle nested keys with dot notation

    setActivities((prevActivities) => {
      const updatedActivities = new Map(prevActivities);
      const activity: any = updatedActivities.get(key) || {};

      // Update activity with nested or non-nested fields
      const newActivity = {
        ...activity,
        [mainKey]: subKey
          ? {
            ...activity[mainKey],
            [subKey]: value,
          }
          : value,
      };

      // Add the updated field to the set
      setUpdatedActivitiesFields((prevFields) => {
        const updatedFields = new Set(prevFields);
        updatedFields.add(`${key}.${name}`);
        return updatedFields;
      });

      updatedActivities.set(key, newActivity as ActivityDTO); // Update activity in the map
      return updatedActivities;
    });
  };

  // Handle change in activity type
  const handleActivityTypeChange = (e: any, key: number) => {
    const selectedType = e.target.value;
    const updatedActivities = new Map(activities);

    // Update activity information based on selected type
    const updateActivity = (key: number) => {
      const activity: any = updatedActivities.get(key) || {};
      switch (selectedType) {
        case 'accommodation':
          delete activity['transportation'];
          break;
        case 'transportation':
          delete activity['accommodation'];
          break;
        case 'normal':
          delete activity['transportation'];
          delete activity['accommodation'];
          break;
        default:
          break;
      }
      updatedActivities.set(key, activity);
    };

    updateActivity(key);

    // Update fields set
    const updatedFields = new Set(
      Array.from(updatedActivitiesFields).filter((field: string) => {
        if (selectedType === 'normal') {
          return !field.includes('accommodation') && !field.includes('transportation');
        }
        return !field.includes(selectedType);
      })
    );

    setUpdatedActivitiesFields(updatedFields);
    setActivities(updatedActivities);
    setActivityType({ type: selectedType, key });
  };


  const saveActivitiesHandler = () => {
    if (validateForm()) {
      // check whether tour details have been saved
      if (!currentTour?.id) {
        alert("Tour details must be saved");
        return;
      }

      // updating tour with activities
      let tour = {
        id: currentTour?.id,
        activities: activities
      } as Partial<TourDTO>;
      updateOneTour(tour);
    }
  }

  return {
    activities,
    setActivities,
    addActivity,
    removeActivity,
    updateActivity,
    resetActivities,
    activityType,
    setActivityType,
    updatedActivitiesFields,
    setUpdatedActivitiesFields,
    saveActivitiesHandler,
    handleInputChange,
    handleActivityTypeChange,
    error, loading, status
  };
};
