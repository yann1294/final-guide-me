import React from "react";
import Image from "next/image";

interface TourDTO {
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
}

interface Props {
  data: TourDTO | null;
}

const TourContent: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <div>Tour not found</div>;
  }

  return (
    <>
      <div className="package-thumb">
        <Image
          src={data.images?.[0] || "/placeholder.jpg"}
          alt={data.name}
          width={250}
          height={250}
        />
      </div>
      <div className="package-header">
        <div className="package-title">
          <h3>{data.name}</h3>
        </div>
        <div className="pd-review">
          <p>Excellent</p>
          <ul>
            {[...Array(4)].map((_, index) => (
              <li key={`star-${index}`}>
                <i className="bx bxs-star" />
              </li>
            ))}
            <li>
              <i className="bx bx-star" />
            </li>
          </ul>
          <p>
            {data.activities ? Object.keys(data.activities).length : 0}{" "}
            Activities
          </p>
        </div>
      </div>
      <div className="p-short-info">
        <div className="single-info">
          <i className="flaticon-clock" />
          <div className="info-texts">
            <strong>Duration</strong>
            <p>{data.durationDays} Days</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-footprints" />
          <div className="info-texts">
            <strong>Location</strong>
            <p>
              {data.location.city}, {data.location.country}
            </p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-traveller" />
          <div className="info-texts">
            <strong>Group Size</strong>
            <p>{data.numberOfSeats || "N/A"} People</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-translate" />
          <div className="info-texts">
            <strong>Guide</strong>
            <p>
              {typeof data.guide === "string" ? data.guide : data.guide.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourContent;
