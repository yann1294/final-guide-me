import { BookingDTO } from "@/dto/booking.dto";
import { PaymentDTO } from "@/dto/payment.dto";
import { create } from "zustand";

interface BookingStore {
  bookings: BookingDTO[];  // Array to store all the bookings
  payment: PaymentDTO;     // Payment information

  setBookings: (bookings: BookingDTO[]) => void;   // Set all bookings from an external source (e.g., API)
  addBooking: (booking: BookingDTO) => void;        // Add a new booking
  updateBooking: (updatedBooking: BookingDTO) => void; // Update an existing booking
  cancelBooking: (id: string) => void;              // Cancel a booking by its ID
  setPayment: (payment: PaymentDTO) => void;        // Set payment information
}

// Define the Zustand store
const useBookingStore = create<BookingStore>((set) => ({
  bookings: [], // Initialize with an empty array
  payment: {} as PaymentDTO,  // Initialize payment with an empty object or default values

  // Set all bookings
  setBookings: (bookings: BookingDTO[]) => set({ bookings }),

  // Add a new booking
  addBooking: (booking: BookingDTO) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),

  // Update an existing booking
  updateBooking: (updatedBooking: BookingDTO) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      ),
    })),

  // Cancel (remove) a booking by its id
  cancelBooking: (id: string) =>
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking.id !== id),
    })),

  // Set payment information
  setPayment: (payment: PaymentDTO) => set({ payment }),
}));

export default useBookingStore;