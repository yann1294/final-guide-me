import { ActivityDTO, TourDTO } from "@/dto/tour.dto";
import { ActionPayloads, ActionType, AddActivityPayload, AddImagePayload, AddTourPayload, CopyIdPayload, DeleteActivityPayload, DeleteImagePayload, DeleteRowPayload, EditRowPayload, HandlerFunction, ViewActivitiesPayload, ViewDescriptionPayload, ViewImagesPayload } from "./types";

  const handlers: {
    [K in ActionType]: HandlerFunction<ActionPayloads[K]>;
  } = {
    [ActionType.COPY_ID]: (payload: CopyIdPayload) => {
      
      // Additional functionality for copying ID
    },
    [ActionType.VIEW_ACTIVITIES]: (payload: ViewActivitiesPayload) => {
      
      // Additional functionality for viewing activities
    },
    [ActionType.VIEW_DESCRIPTION]: (payload: ViewDescriptionPayload) => {
      console.log(
        `Tour Name: ${payload.tourName}, ID: ${payload.id}, Description: ${payload.description}`
      );
      // Additional functionality for viewing description
    },
    [ActionType.VIEW_IMAGES]: (payload: ViewImagesPayload) => {
      
      // Additional functionality for viewing images
    },
    [ActionType.EDIT_ROW]: (payload: EditRowPayload) => {
      
      // Additional functionality for editing a row
    },
    [ActionType.DELETE_ROW]: (payload: DeleteRowPayload) => {
      
      // Additional functionality for deleting a row
    },
    [ActionType.ADD_TOUR]: (payload: AddTourPayload) => {
      
      // Additional functionality for adding a tour
    },
    [ActionType.ADD_IMAGE]: (payload: AddImagePayload) => {
      
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
      
      // Additional functionality for deleting an image
    },
    [ActionType.DELETE_ACTIVITY]: (payload: DeleteActivityPayload) => {
      
      // Additional functionality for deleting an activity
    },
  };
  


