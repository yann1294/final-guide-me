import useSWR from "swr";
import axios from "axios";
import { ResponseDTO } from "@/dto/helper.dto";
import { useState } from "react";
import { BookingDTO } from "@/dto/booking.dto";
import useBookingStore from "@/stores/bookingStore";
import { PaymentDTO } from "@/dto/payment.dto";
export const useCreateStripeOrder = () => {
  const setPayment = useBookingStore((state) => state.setPayment);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createStripeOrder = async (payment: PaymentDTO) => {
    setLoading(true);
    setError(null);
    console.log("Creating new stripe order ");

    try {
      // Replace with the actual endpoint for fetching packages
      const response = await axios.post<ResponseDTO>('/api/payments', payment);
      
      // Check if the response status is 'success'
      if (response.data.status !== 'success') {
        console.error(response.data);
        throw new Error(response.data.message);
      }

      // Persist the fetched tours in Zustand store
      // redirect user to payment
      if (response.data.data) {
        window.location.assign((response.data.data as { url: string }).url);
      }
      setPayment(response.data.data as PaymentDTO);
    } catch (err) {
      console.error("Error: ", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  return { createStripeOrder, loading, error };
};