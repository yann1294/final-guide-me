import useTourStore from "@/stores/tourStore";
import { useState } from "react";
import { useUploadImages } from "../useImages";

/**
 * Custom hook for managing photos in tours.
 * @returns {Object} State and handlers for managing photos.
 */
export const usePhotoManagement = (origin: "new" | "edit/view") => {
  // State for managing photos related to the tour
  const [photos, setPhotos] = useState<Map<number, { file: File; dataString: string }>>(new Map());

  // tour management
  const { currentTour } = useTourStore();

  // upload images
  const { uploadImages, loading, error } = useUploadImages();

  /**
   * Add a photo to the collection from an input element.
   * @param {number} key - Unique identifier for the photo.
   * @param {any} event - Input element form event.
   */
  const addPhoto = async (key: number, event: any) => {
    const inputElement = event.target;
    if (inputElement && inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const dataString = reader.result as string;
        setPhotos((prev) => new Map(prev).set(key, { file, dataString }));
      };

      reader.readAsDataURL(file);
    } else {
      console.error("No file selected or input element not found.");
    }
  };

  /**
   * Remove a photo from the collection.
   * @param {number} key - Unique identifier for the photo to be removed.
   */
  const removePhoto = (key: number) => {
    setPhotos((prev) => {
      const updated = new Map(prev);
      updated.delete(key);
      return updated;
    });
  };

  /**
   * Clear all photos from the collection.
   */
  const clearPhotos = () => {
    setPhotos(new Map());
  };

  /**
   * Upload photos to the server along with the tour ID.
   * @returns {Promise} - A promise that resolves when the upload is complete.
   */
  const uploadImagesHandler = async (): Promise<void> => {
     // check whether tour details have been saved
     if (!currentTour?.id) {
      alert("Tour details must be saved");
      return;
    }

    const formData = new FormData();

    // Append each photo and the tourId to the FormData
    photos.forEach((photo) => {
      formData.append("file", photo.file);
    });
    formData.append("id", currentTour?.id as string); // Add the tour ID to the form data

    // upload images
    uploadImages(formData);
  };

  return {
    photos,
    addPhoto,
    removePhoto,
    clearPhotos,
    uploadImagesHandler,
    loading, error,
  };
};
