import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Guide {
    price: number;
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    interests: string[];
    avatar: string; // Add avatar URL to the Guide interface
  }

  
interface GuideCardProps {
  guide: Guide;
  onClick: (id: number) => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide, onClick }) => {
  const handleClick = () => {
    onClick(guide.id);
  };

  return (
    <>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4 mt-4" onClick={handleClick}>
      <div className="package-card shadow-md hover:shadow-lg transition duration-300 rounded-lg">
        <div className="package-thumb">
          <Image
            src={guide.avatar}
            alt={guide.name}
            className="rounded-t-lg"
            width={200}
            height={200}
          />
        </div>
        <div className="package-details p-4">
          <div className="package-info">
            <h5 className="text-xl font-semibold">
              <span>${guide.price}</span>/Per Person
            </h5>
          </div>
          <h3 className="text-lg font-medium mt-2">
            <i className="flaticon-arrival" />
            <Link href={`/guides/${guide.id}`}>{guide.name}</Link>
          </h3>
        </div>
      </div>
    </div>
    </>
  );
};

export default GuideCard;
