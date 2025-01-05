import { BookingDTO } from "@/dto/booking.dto";
import { PaymentDTO } from "@/dto/payment.dto";
import { create } from "zustand";

interface BookingStore {
  bookings: BookingDTO[];  // Array to store all the bookings
  payment: PaymentDTO;     // Payment information

  setBookings: (bookings: BookingDTO[]) => void;   // Set all bookings from an external source (e.g., API)
  setPayment: (payment: PaymentDTO) => void;        // Set payment information
}

// Define the Zustand store
const useBookingStore = create<BookingStore>((set) => ({
  bookings: [], // Initialize with an empty array
  payment: {} as PaymentDTO,  // Initialize payment with an empty object or default values

  // Set all bookings
  setBookings: (bookings: BookingDTO[]) => set({ bookings }),

  // Set payment information
  setPayment: (payment: PaymentDTO) => set({ payment }),
}));

export default useBookingStore;
