"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import { useRouter } from "next/navigation";

// Define the updated TourDTO interface
interface TourDTO {
  id: string;
  name: string;
  location: {
    name: string;
    city: string;
    country: string;
    address?: string;
    location?: {
      latitude?: number;
      longitude?: number;
    };
  };
  price: number;
  durationDays: number;
  discount: number;
  numberOfSeats?: number;
  description?: string;
  isAvailable: boolean;
  guide: string | { name: string };
  images?: string[];
  activities?: Record<string, object>;
}

const TourList = () => {
  const router = useRouter();
  const [data, setData] = useState<TourDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/tours");
        const result = await response.json();
        setData(result.data || []); // Use `data` field from the API response
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null; // Suspense handles the loading skeleton

  const handleClick = (id: string) => {
    router.push(`/tours/${id}`);
  };

  return (
    <div className="row g-4">
      {data.map((tour, index) => (
        <div key={`${tour.id}-${index}`} className="col-lg-4 col-md-6 col-sm-6">
          <div
            className="package-card cursor-pointer"
            onClick={() => handleClick(tour.id)}
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
