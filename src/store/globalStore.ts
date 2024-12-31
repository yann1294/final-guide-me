// store/globalStore.ts
import { BookingDTO } from "@/dto/booking.dto";
import { PackageDTO } from "@/dto/package.dto";
import { TourDTO } from "@/dto/tour.dto";
import { create } from "zustand";
import {GuideDTO} from "@/dto/guide.dto"

interface GlobalStore {
  tours: TourDTO[] | null;
  packages: PackageDTO[] | null;
  bookings: BookingDTO[] | null;
  // guides: GuideDTO[] | null;
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
