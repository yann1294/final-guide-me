"use client";

import React from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
// Assuming TourContent and TourTab are designed to handle TourDTO
import TourContent from "@/components/tours/TourContent";
import TourTab from "@/components/tours/TourTab";

import { useRouter } from "next/navigation";
import useTourStore from "@/stores/tourStore";

export default function TourDetailsContent() {
  const { id } = useParams(); // Get the tour ID from the URL query parameter
  const { tours } = useTourStore();

  //
  const tour = tours?.find((tour) => tour.id === id);

  const router = useRouter();

  if (!tour) return null; // Suspense handles the loading skeleton

  return (
    <div className="bg-white">
      <Breadcrumb
        pageName="Tour Details"
        pageTitle={tour.name || "Tour Details"}
      />
      <div className="package-details-wrapper pt-120">
        <div className="container pt-12">
          <div className="row">
            {/* Left Column: Tour Details */}
            <div className="col-lg-8">
              <div className="package-details">
                <TourContent tour={tour} />
                <TourTab tour={tour} />
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="col-lg-4">
              <div className="package-d-sidebar">
                <div className="p-sidebar-form">
                  <h5 className="package-d-head">Book This Tour</h5>
                  <div className="price-info">
                    <h4>
                      <span>${tour.price}</span> / Per Person
                    </h4>
                  </div>
                  <div className="availability-status">
                    {tour.isAvailable ? (
                      <span className="badge bg-success">Available</span>
                    ) : (
                      <span className="badge bg-danger">Sold Out</span>
                    )}
                  </div>
                  <div
                    className="col-lg-12"
                    onClick={() => router.push(`/booking/${tour.id}`)}
                  >
                    <input
                      type="submit"
                      value="Book Now"
                      disabled={!tour.isAvailable}
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
