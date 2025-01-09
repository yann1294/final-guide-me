export type TourLocationDTO = {
    name: string;
    city: string;
    country: string;
}

export type GMGeoPoint = {
    latitude: number;
    longitude: number;
}

export type TransportationDTO = {
    arrivalTime: Date;
    departureTime: Date;
    type: string;
}

export type AccommodationDTO = {
    type: string;
    name: string;
}

export type ActivityLocationDTO = {
    name: string;
    city: string;
    country: string;
    address: string;
    location: GMGeoPoint;
}

export type ActivityDTO = {
    id?: number;
    name: string;
    durationHours: number;
    location: ActivityLocationDTO;
    transportation: TransportationDTO;
    accommodation: AccommodationDTO;
}

export type TourDTO = {
    id?: string;
    name: string;
    price: number;
    date: any;
    images?: string[];
    durationDays: number;
    discount: number;
    numberOfSeats: number;
    description: string;
    isAvailable: boolean;
    guide: string;
    location: TourLocationDTO;
    activities: Map<number, ActivityDTO>;
}
