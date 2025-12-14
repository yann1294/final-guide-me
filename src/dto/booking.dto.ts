export type BookingStatus = "in-process" | "full" | "completed" | "canceled";

export type TouristBookingStatus = "completed" | "canceled";

export type PaymentStatus = "pending" | "canceled" | "in-progress";

export type TouristBooking = {
  bookedOn: string;
  bookingStatus: TouristBookingStatus;
  paymentStatus: PaymentStatus;
};

export type BookingDTO = {
  id?: string;
  status: BookingStatus;
  bookedOn: string;
  tourist: Record<string, TouristBooking>;
  tour?: string;
  tourPackage?: string;
};
