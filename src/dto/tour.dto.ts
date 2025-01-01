type TourLocationDTO = {
    name: string;
    city: string;
    country: string;
}

type GMGeoPoint = {
    latitude: number;
    longitude: number;
}

type TransportationDTO = {
    arrivalTime: Date;
    departureTime: Date;
    type: string;
}

type AccommodationDTO = {
    type: string;
    name: string;
}

type ActivityLocationDTO = {
    name: string;
    city: string;
    country: string;
    address: string;
    location: GMGeoPoint;
}

type ActivityDTO = {
    id: number;
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
    date: { _seconds: number; _nanoseconds: number };
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
