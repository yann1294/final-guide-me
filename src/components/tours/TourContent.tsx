import React from "react";
import Image from "next/image";

interface Props {
  tour: {
    id: string;
    name: string;
    description?: string;
    location: {
      name: string;
      city: string;
      country: string;
      address?: string;
    };
    price: number;
    durationDays: number;
    discount: number;
    numberOfSeats?: number;
    isAvailable: boolean;
    guide: string | { name: string };
    images?: string[];
    activities?: Record<string, object>;
  };
}

const TourContent: React.FC<Props> = ({ tour }) => {
  return (
    <div>
      {/* Image Section */}
      <div className="package-thumb mb-4">
        <Image
          src={tour.images?.[0] || "/placeholder.jpg"}
          alt={tour.name}
          width={400}
          height={300}
          className="rounded-md object-cover"
        />
      </div>

      {/* Header Section */}
      <div className="package-header mb-6">
        <div className="package-title">
          <h3 className="text-xl font-bold">{tour.name}</h3>
        </div>
        <div className="pd-review flex items-center space-x-2 mt-2">
          <p className="text-green-600">Excellent</p>
          <ul className="flex">
            {[...Array(4)].map((_, index) => (
              <li key={`star-${index}`} className="text-yellow-500">
                <i className="bx bxs-star" />
              </li>
            ))}
            <li className="text-yellow-300">
              <i className="bx bx-star" />
            </li>
          </ul>
          <p>
            {tour.activities ? Object.keys(tour.activities).length : 0}{" "}
            Activities
          </p>
        </div>
      </div>

      {/* Short Info Section */}
      <div className="p-short-info grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="single-info">
          <i className="flaticon-clock" />
          <div className="info-texts">
            <strong>Duration</strong>
            <p>{tour.durationDays} Days</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-footprints" />
          <div className="info-texts">
            <strong>Location</strong>
            <p>
              {tour.location.city}, {tour.location.country}
            </p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-traveller" />
          <div className="info-texts">
            <strong>Group Size</strong>
            <p>{tour.numberOfSeats || "N/A"} People</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-translate" />
          <div className="info-texts">
            <strong>Guide</strong>
            <p>
              {typeof tour.guide === "string" ? tour.guide : tour.guide.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourContent;
