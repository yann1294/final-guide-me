// store/globalStore.ts
import { create } from "zustand";

export interface BookingDTO {
  id?: string;
  status: string;
  bookedOn: Date;
  tourist: string[];
  tour?: string;
  tourPackage?: string;
}

interface PackageDTO {
  id: string;
  name: string;
  location: LocationDTO;
  price: number;
  date: string;
  images?: string[];
  tours: string[];
  durationDays: number;
  discount: number;
  numberOfSeats: number;
  description: string;
  isAvailable: boolean;
  guide?: string;
}

interface LocationDTO {
  name: string;
  city: string;
  country: string;
  address?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
}

interface TourDTO {
  id: string;
  name: string;
  location: {
    name: string;
    city: string;
    country: string;
    address?: string;
    location?: {
      latitude?: number;
      longitude?: number;
    };
  };
  price: number;
  durationDays: number;
  discount: number;
  numberOfSeats?: number;
  description?: string;
  isAvailable: boolean;
  guide: string | { name: string };
  images?: string[];
  activities?: Record<string, object>;
}

interface GlobalStore {
  tours: TourDTO[] | null;
  packages: PackageDTO[] | null;
  bookings: BookingDTO[] | null;
  setTours: (tours: TourDTO[]) => void;
  setPackages: (packages: PackageDTO[]) => void;
  setBookings: (bookings: BookingDTO[]) => void;
  addBooking: (booking: BookingDTO) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  tours: null,
  packages: null,
  bookings: null,
  setTours: (tours) => set({ tours }),
  setPackages: (packages) => set({ packages }),
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...(state.bookings || []), booking],
    })),
}));

export default useGlobalStore;
