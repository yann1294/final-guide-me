import { ActivityDTO, TourDTO } from "@/dto/tour.dto";
import { ActionPayloads, ActionType, AddActivityPayload, AddImagePayload, AddTourPayload, CopyIdPayload, DeleteActivityPayload, DeleteImagePayload, DeleteRowPayload, EditRowPayload, HandlerFunction, ViewActivitiesPayload, ViewDescriptionPayload, ViewImagesPayload } from "./types";

  const handlers: {
    [K in ActionType]: HandlerFunction<ActionPayloads[K]>;
  } = {
    [ActionType.COPY_ID]: (payload: CopyIdPayload) => {
      console.log(`Copied ID: ${payload.id}`);
      // Additional functionality for copying ID
    },
    [ActionType.VIEW_ACTIVITIES]: (payload: ViewActivitiesPayload) => {
      console.log(`Tour ID: ${payload.tourId}, Activities:`, payload.activities);
      // Additional functionality for viewing activities
    },
    [ActionType.VIEW_DESCRIPTION]: (payload: ViewDescriptionPayload) => {
      console.log(
        `Tour Name: ${payload.tourName}, ID: ${payload.id}, Description: ${payload.description}`
      );
      // Additional functionality for viewing description
    },
    [ActionType.VIEW_IMAGES]: (payload: ViewImagesPayload) => {
      console.log(`Tour ID: ${payload.tourId}, Images:`, payload.images);
      // Additional functionality for viewing images
    },
    [ActionType.EDIT_ROW]: (payload: EditRowPayload) => {
      console.log(`Editing Tour:`, payload.tourDTO);
      // Additional functionality for editing a row
    },
    [ActionType.DELETE_ROW]: (payload: DeleteRowPayload) => {
      console.log(`Deleting Tour: ${payload.name} (ID: ${payload.id})`);
      // Additional functionality for deleting a row
    },
    [ActionType.ADD_TOUR]: (payload: AddTourPayload) => {
      console.log(`Adding Tour:`, payload.tourDTO);
      // Additional functionality for adding a tour
    },
    [ActionType.ADD_IMAGE]: (payload: AddImagePayload) => {
      console.log(`Adding Image to Tour ID: ${payload.tourId}`, payload.newImage);
      // Additional functionality for adding an image
    },
    [ActionType.ADD_ACTIVITY]: (payload: AddActivityPayload) => {
      console.log(
        `Updating Activities for Tour ID: ${payload.tourId}`,
        `Old Activities:`,
        payload.oldActivity,
        `New Activities:`,
        payload.newActivity
      );
      // Additional functionality for adding/updating an activity
    },
    [ActionType.DELETE_IMAGE]: (payload: DeleteImagePayload) => {
      console.log(`Deleting Image from Tour ID: ${payload.tourId}`, payload.image);
      // Additional functionality for deleting an image
    },
    [ActionType.DELETE_ACTIVITY]: (payload: DeleteActivityPayload) => {
      console.log(`Deleting Activity:`, payload.activityToDelete);
      // Additional functionality for deleting an activity
    },
  };
  


