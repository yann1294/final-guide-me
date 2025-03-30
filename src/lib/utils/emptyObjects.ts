import { PackageDTO } from "@/dto/package.dto";
import { ActivityDTO, TourDTO, TransportationDTO } from "@/dto/tour.dto";

export const emptyTourObject = {
    name: "",
    location: {
        name: "",
        city: "",
        country: "",
    },
    price: 0,
    durationDays: 1,
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
    id: 0,
    name: "",
    durationHours: 1,
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
} as ActivityDTO


export const emptyPackageObject = {
    name: "",
    location: {
        name: "",
        city: "",
        country: "",
        address: "",
        location: {
            latitude: 0,
            longitude: 0,
        },
    },
    price: 0,
    durationDays: 1,
    discount: 0,
    numberOfSeats: 0,
    description: "",
    isAvailable: false,
    date: new Date(),
    tours: [],
    images: [],
    guide: "",
} as PackageDTO;