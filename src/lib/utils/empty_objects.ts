import { ActivityDTO, TourDTO, TransportationDTO } from "@/dto/tour.dto";

export const emptyTourObject = {
    name: "",
    location: {
        name: "",
        city: "",
        country: "",
        address: "",
        location: {
            name: "",
            city: "",
            country: ""
        }
    },
    price: 0,
    durationDays: 0,
    discount: 0,
    numberOfSeats: 0,
    description: "",
    isAvailable: false,
    date: new Date().toISOString(),
    activities: {} as Map<number, ActivityDTO>,
    images: [],
    guide: ""
} as TourDTO;

export const emptyActivityObject = {
        name: "",
        durationHours: 0,
        location: {
            name: "",
            city: "",
            country: "",
            address: "",
            location: {
                latitude: 0,
                longitude: 0
            }
        },
        transportation: {
            arrivalTime: new Date(),
            departureTime: new Date(),
            type: ""
        },
        accommodation: {
            type: "",
            name: ""
        }
    } as ActivityDTO;

