"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/stores/globalStore";
import useTourStore from "@/stores/tourStore";
import { useFetchTours } from "@/hooks/useTours";

const TourList = () => {
  const router = useRouter();
  const { tours } = useTourStore();
  const { fetchTours } = useFetchTours();

  useEffect(() => {
    if (tours.length === 0) {
      fetchTours();
    }
  }, []);

  if (!tours) return null; // Suspense handles the loading skeleton

  const handleClick = (id: string) => {
    router.push(`/tours/${id}`);
  };

  return (
    <div className="row g-4">
      {tours.map((tour, index) => (
        <div key={`${tour.id}-${index}`} className="col-lg-4 col-md-6 col-sm-6">
          <div
            className="package-card cursor-pointer"
            onClick={() => handleClick(tour.id as string)}
          >
            {/* Thumbnail */}
            <div className="package-thumb">
              <Image
                src={
                  tour.images?.[0] ||
                  "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
                }
                alt={tour.name}
                className="img-fluid rounded"
                width={300}
                height={200}
              />
            </div>

            {/* Details */}
            <div className="package-details">
              <div className="package-info d-flex justify-content-between">
                <h5>
                  <span>${tour.price}</span> / Per Person
                </h5>
                <span>{tour.durationDays} Days</span>
              </div>
              <h3 className="mt-2">
                <Link href={`/tours/${tour.id}`}>{tour.name}</Link>
              </h3>
              <p className="text-muted">
                {tour.description?.substring(0, 100) ||
                  "No description available."}
              </p>
            </div>

            {/* Availability */}
            <div className="package-status mt-3">
              {tour.isAvailable ? (
                <span className="badge bg-success">Available</span>
              ) : (
                <span className="badge bg-danger">Sold Out</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourList;
