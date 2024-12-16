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
    onClick: (guide: Guide) => void; // Change the type of onClick function
}

const GuideCard: React.FC<GuideCardProps> = ({ guide, onClick }) => {
    const handleClick = () => {
        onClick(guide); // Simply call the onClick function with the guide object
    };

    return (
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4 mt-4" onClick={handleClick}>
            <div className="package-card bg-white shadow-md hover:shadow-lg transition duration-300 rounded-lg">
                <div className="package-thumb rounded-t-lg overflow-hidden">
                    <Image
                        src={guide.avatar}
                        alt={guide.name}
                        width={200}
                        height={200}
                    />
                </div>
                <div className="package-details p-4">
                    <div className="package-info">
                    <h4 className="text-sm font-medium mt-2">
                        <Link href={`/guides/${guide.id}`}>{guide.email}</Link>
                    </h4>
                    <p className="text-xl font-semibold">
                            <span>{guide.phone}</span>
                        </p>
                    </div>
                    <h3 className="text-lg font-medium mt-2">
                        <i className="flaticon-arrival" />
                        <Link href={`/guides/${guide.id}`}>{guide.name}</Link>
                    </h3>
                    <p className="text-xl font-semibold">
                            <span>{guide.address}</span>
                        </p>
                </div>
            </div>
        </div>
    );
};

export default GuideCard;
