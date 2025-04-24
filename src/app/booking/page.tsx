"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Label } from "reactstrap";
import { Input } from "reactstrap";

import useTourStore from "@/stores/tourStore";

export default function BookTourPage() {
  const { id } = useParams();
  const { tours } = useTourStore();
  const tour = tours?.find((t: any) => t.id === id);

  const [tourists, setTourists] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTourist = () => {
    setTourists([...tourists, ""]);
  };

  const handleTouristChange = (index: number, value: string) => {
    const newTourists = [...tourists];
    newTourists[index] = value;
    setTourists(newTourists);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const booking = {
      status: "pending",
      bookedOn: new Date(),
      tourist: tourists.filter((t) => t.trim() !== ""),
      tour: id,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        // Handle successful booking
        // You can redirect to a confirmation page or show a success message
      } else {
        // Handle error
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tour) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Book Tour: {tour.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="tourName">Tour Name</Label>
              <Input id="tourName" value={tour.name} disabled />
            </div>
            <div>
              <Label htmlFor="tourPrice">Price</Label>
              <Input id="tourPrice" value={`$${tour.price}`} disabled />
            </div>
            <div>
              <Label>Tourists</Label>
              {tourists.map((tourist, index) => (
                <div key={index} className="mt-2">
                  <Input
                    placeholder={`Tourist ${index + 1} Name`}
                    value={tourist}
                    onChange={(e) => handleTouristChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddTourist}
                className="mt-2"
                variant="outline"
              >
                Add Tourist
              </Button>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Book Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
