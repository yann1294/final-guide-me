export type TouristBooking = {
  bookedOn: string;
  bookingStatus: string;
  paymentStatus: string;
};

export type BookingDTO = {
  id?: string;
  status: string;
  bookedOn: string;
  tourist: Record<string, TouristBooking>;
  tour?: string;
  package?: string;
};
