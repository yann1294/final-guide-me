import useSWR from "swr";
import axios from "axios";
import useGlobalStore from "@/stores/globalStore";
import { ResponseDTO } from "@/dto/helper.dto";
import { useState } from "react";
import { BookingDTO } from "@/dto/booking.dto";
import useBookingStore from "@/stores/bookingStore";
import { PaymentDTO } from "@/dto/payment.dto";

const fetcher = (url: string) => axios.get<ResponseDTO>(url).then((res) => res.data);

export const useFetchBookings = () => {
    const setBookings = useGlobalStore((state) => state.setBookings);
    const { data, error } = useSWR("http://localhost:3000/bookings", fetcher);
  
    return {
      bookings: data,
      isLoading: !data && !error,
      isError: error,
    };
  };
  
export const useCreateBooking = () => {
  const addBooking = useGlobalStore((state) => state.addBooking);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (newBooking: BookingDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ResponseDTO>('/bookings', newBooking);
      
      // check if the response.data.status is 'success'
      if (response.data.status !== 'success') {
        throw new Error(response.data.message);
      }

      // update the booking id with the one returned from the server
      newBooking.id = response.data.data as string;

      // Persist the new booking in Zustand store
      addBooking(newBooking);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};

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