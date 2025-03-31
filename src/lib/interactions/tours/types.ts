// tourActions.ts

import { ActivityDTO, TourDTO } from "@/dto/tour.dto";

// Enum for tour actions
export enum ActionType {
  COPY_ID = 'COPY_ID',
  VIEW_ACTIVITIES = 'VIEW_ACTIVITIES',
  VIEW_DESCRIPTION = 'VIEW_DESCRIPTION',
  VIEW_IMAGES = 'VIEW_IMAGES',
  EDIT_ROW = 'EDIT_ROW',
  DELETE_ROW = 'DELETE_ROW',
  ADD_TOUR = 'ADD_TOUR',
  ADD_IMAGE = 'ADD_IMAGE',
  ADD_ACTIVITY = 'ADD_ACTIVITY',
  DELETE_IMAGE = 'DELETE_IMAGE',
  DELETE_ACTIVITY = 'DELETE_ACTIVITY',
}

// Payload Interfaces
export interface CopyIdPayload {
  id: string;
}

export interface ViewActivitiesPayload {
  tourId: string;
  activities: Map<string, ActivityDTO>;
}

export interface ViewDescriptionPayload {
  id: string;
  tourName: string;
  description: string;
}

export interface ViewImagesPayload {
  tourId: string;
  images: string[];
}

export interface EditRowPayload {
  tourDTO: TourDTO;
}

export interface DeleteRowPayload {
  id: string;
  name: string;
}

export interface AddTourPayload {
  tourDTO: TourDTO;
}

export interface AddImagePayload {
  tourId: string;
  newImage: string;
}

export interface AddActivityPayload {
  tourId: string;
  oldActivity: Map<string, ActivityDTO>;
  newActivity: Map<string, ActivityDTO>;
}

export interface DeleteImagePayload {
  tourId: string;
  image: string;
}

export interface DeleteActivityPayload {
  activityToDelete: Map<string, ActivityDTO>;
}

// Action Payload Mapping
export type ActionPayloads = {
  [ActionType.COPY_ID]: CopyIdPayload;
  [ActionType.VIEW_ACTIVITIES]: ViewActivitiesPayload;
  [ActionType.VIEW_DESCRIPTION]: ViewDescriptionPayload;
  [ActionType.VIEW_IMAGES]: ViewImagesPayload;
  [ActionType.EDIT_ROW]: EditRowPayload;
  [ActionType.DELETE_ROW]: DeleteRowPayload;
  [ActionType.ADD_TOUR]: AddTourPayload;
  [ActionType.ADD_IMAGE]: AddImagePayload;
  [ActionType.ADD_ACTIVITY]: AddActivityPayload;
  [ActionType.DELETE_IMAGE]: DeleteImagePayload;
  [ActionType.DELETE_ACTIVITY]: DeleteActivityPayload;
};

// Handler Function Type
export type HandlerFunction<T> = (payload: T) => void;
