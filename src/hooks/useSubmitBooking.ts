import { useState } from "react";
import axios from "axios";
import useGlobalStore, { BookingDTO } from "@/store/globalStore";

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
    setIsLoading(true);
    setError(null);
    try {
      const bookingDTO: BookingDTO = {
        status: "pending",
        bookedOn: new Date(),
        tourist: [formData.name], // Assuming we're booking for a single tourist
        tour: formData.tourId,
        // We're not handling tourPackage in this form, so it's omitted
      };
      const response = await axios.post<{
        success: boolean;
        booking: BookingDTO;
      }>("http://localhost:3000/bookings", bookingDTO);
      addBooking(response.data.booking);
      setIsLoading(false);
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
