"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
// Assuming TourContent and TourTab are designed to handle TourDTO
import TourContent from "@/components/tours/TourContent";
import TourTab from "@/components/tours/TourTab";
import axios from "axios";

// Use the TourDTO interface from app/tours/page.tsx
interface TourDTO {
  id: string;
  name: string;
  location: {
    name: string;
    city: string;
    country: string;
    address: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  durationDays: number;
  discount: number;
  numberOfSeats: number;
  description: string;
  isAvailable: boolean;
  guide: string;
  activities: Record<number, object>;
}

export default function TourDetailsContent() {
  const { id } = useParams(); // Get the tour ID from the URL query parameter
  console.log("ID from params:", id);
  const [data, setData] = useState<TourDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ID:", id);
    const fetchData = async () => {
      if (!id) return; // Wait until the id is available
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/tours/${id}`);
        const tourData = response.data?.data;

        if (tourData) {
          setData(tourData); // Extract the relevant data
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error: any) {
        console.error("Error fetching tour details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!data) return null; // Suspense handles the loading skeleton

  return (
    <div className="bg-white">
      <Breadcrumb
        pageName="Tour Details"
        pageTitle={data.name || "Tour Details"}
      />
      <div className="package-details-wrapper pt-120">
        <div className="container pt-12">
          <div className="row">
            {/* Left Column: Tour Details */}
            <div className="col-lg-8">
              <div className="package-details">
                <TourContent data={data} />
                <TourTab data={data} />
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="col-lg-4">
              <div className="package-d-sidebar">
                <div className="p-sidebar-form">
                  <h5 className="package-d-head">Book This Tour</h5>
                  <div className="price-info">
                    <h4>
                      <span>${data.price}</span> / Per Person
                    </h4>
                  </div>
                  <div className="availability-status">
                    {data.isAvailable ? (
                      <span className="badge bg-success">Available</span>
                    ) : (
                      <span className="badge bg-danger">Sold Out</span>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="submit"
                      value="Book Now"
                      disabled={!data.isAvailable}
                      className="btn btn-primary mt-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
