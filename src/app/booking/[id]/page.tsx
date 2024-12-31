"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useGlobalStore from "@/store/globalStore";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "reactstrap";
import { Label } from "reactstrap";
import { useSubmitBooking } from "@/hooks/useSubmitBooking";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { tours } = useGlobalStore();
  const tour = tours?.find((tour) => tour.id === id);
  const { submitBooking, isLoading, error } = useSubmitBooking();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    numberOfPeople: 1,
    specialRequests: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    numberOfPeople: "",
  });

  if (!tour) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    if (
      formData.numberOfPeople < 1 ||
      formData.numberOfPeople > (tour.numberOfSeats || 1)
    ) {
      newErrors.numberOfPeople = `Number of people must be between 1 and ${tour.numberOfSeats || 1}`;
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await submitBooking({ ...formData, tourId: id as string });
      toast({
        title: "Booking Successful",
        description: "Your tour has been booked successfully!",
      });
      // router.push("/bookings"); // Assuming you have a bookings page to redirect to
    } catch (err) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your tour. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white">
      <Breadcrumb pageName="Book Tour" pageTitle={tour.name} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="tour-info">
            <h2 className="text-2xl font-bold mb-4">{tour.name}</h2>
            <p className="mb-2">
              <strong>Location:</strong> {tour.location.city},{" "}
              {tour.location.country}
            </p>
            <p className="mb-2">
              <strong>Duration:</strong> {tour.durationDays} days
            </p>
            <p className="mb-2">
              <strong>Price:</strong> ${tour.price} per person
            </p>
            <p className="mb-2">
              <strong>Available Seats:</strong> {tour.numberOfSeats}
            </p>
            <p className="mb-4">
              <strong>Guide:</strong>{" "}
              {typeof tour.guide === "string" ? tour.guide : tour.guide.name}
            </p>
            <p className="mb-4">{tour.description}</p>
          </div>
          <div className="booking-form">
            <h3 className="text-xl font-bold mb-4">Book Your Tour</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.date && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                )}
              </div>
              <div>
                <Label htmlFor="numberOfPeople">Number of People</Label>
                <Input
                  id="numberOfPeople"
                  name="numberOfPeople"
                  type="number"
                  min="1"
                  max={tour.numberOfSeats}
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.numberOfPeople && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.numberOfPeople}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Booking..." : "Confirm Booking"}
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
