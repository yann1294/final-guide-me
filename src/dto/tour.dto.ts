type ActivityDTO = {
    id: number;
    name: string;
    durationHours: number;
    location: {
        name: string;
        city: string;
        country: string;
        address: string;
        location: {
            latitude: number;
            longitude: number;
        };
    };
    transportation: {
        arrivalTime: Date;
        departureTime: Date;
        type: string;
    };
    accommodation: {
        type: string;
        name: string;
    };
}

export interface TourDTO {
    id: string;
    name: string;
    location: {
        name: string;
        city: string;
        country: string;
        address: string;
        location: {
            latitude: number;
            longitude: number;
        };
    };
    price: number;
    durationDays: number;
    discount: number;
    numberOfSeats: number;
    description: string;
    isAvailable: boolean;
    guide: string;
    images?: string[];
    activities: Map<number, ActivityDTO>;
}