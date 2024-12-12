import { FC } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackageDetailsProps {
  package: {
    name: string;
    price: number;
    durationDays: number;
    maxGroupSize: number;
    location: string;
    images: string[];
  };
}

const PackageDetails: FC<PackageDetailsProps> = ({ package: pkg }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-[#FF7F47]">{pkg.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Image
              //src={pkg.images[0] || "/placeholder.jpg"}
              src="https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
              alt={pkg.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-64"
            />
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-[#6BC8B4]">
                ${pkg.price}
              </span>
              <Button className="bg-[#FF7F47] text-white">Book Now</Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-primary-600" />
              <span>{pkg.durationDays} days</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-primary-600" />
              <span>Max group size: {pkg.maxGroupSize}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-primary-600" />
              <span>{pkg.location}</span>
            </div>
            <p className="text-gray-600">
              Experience the beauty and culture of {pkg.name} with our carefully
              curated package. Enjoy breathtaking landscapes, immerse yourself
              in local traditions, and create unforgettable memories on this{" "}
              {pkg.durationDays}-day adventure.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageDetails;
