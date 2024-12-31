import { useState } from "react";
import axios from "axios";
import useGlobalStore from "@/store/globalStore";
import { BookingDTO, TouristBooking } from "@/dto/booking.dto";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  numberOfPeople: number;
  specialRequests: string;
  tourId: string;
}

export const useSubmitBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addBooking = useGlobalStore((state) => state.addBooking);

  const submitBooking = async (formData: BookingFormData) => {
    console.log("submitBooking", formData);
    setIsLoading(true);
    setError(null);
    try {
      // create tourist object
      let tourist = new Map<string, TouristBooking>();
      tourist.set("testUser", {
        bookedOn: new Date().toISOString(),
        bookingStatus: "completed",
        paymentStatus: "pending",
      } as TouristBooking);

      // create booking object
      const bookingDTO: BookingDTO = {
        status: "pending",
        bookedOn: new Date().toISOString(),
        tourist: tourist, // Assuming we're booking for a single tourist
        tour: formData.tourId,
        // We're not handling tourPackage in this form, so it's omitted
      };
      const response = await axios.post<{
        status: string;
        code: string | number;
        message: string;
        data: string[] | object[] | string | object | null;
      }>("http://localhost:3000/bookings/create", bookingDTO);
      // addBooking(response.data);
      setIsLoading(false);
      console.log("response", response);
      return response.data;
    } catch (err) {
      setError(
        "An error occurred while submitting the booking. Please try again.",
      );
      setIsLoading(false);
      throw err;
    }
  };

  return { submitBooking, isLoading, error };
};
