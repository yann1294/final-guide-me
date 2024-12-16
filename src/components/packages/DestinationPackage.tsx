import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DestinationPackageProps {
  package: {
    id: string;
    name: string;
    description: string;
    price: number;
    durationDays: number;
    tours: string[];
  };
}

const DestinationPackage: React.FC<DestinationPackageProps> = ({
  package: pkg,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8">
        <Link href={`/destinations/${pkg.id}`} className="inline-block">
          <h3 className="text-2xl font-bold text-[#FF7F47] mb-2 cursor-pointer">
            {pkg.name}
          </h3>
        </Link>

        <p className="text-gray-600">{pkg.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pkg.tours.map((tourId, index) => (
          <Card
            key={`${pkg.id}-${index}`}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
            onClick={() => router.push(`/tours/${tourId}`)}
          >
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
                alt={pkg.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {pkg.name} - Tour {index + 1}
              </h4>
              <p className="text-gray-600 text-sm line-clamp-2">
                {pkg.description}
              </p>
            </CardContent>
            <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between items-center">
              <Badge variant="secondary" className="text-sm">
                {pkg.durationDays} days
              </Badge>
              <span className="text-[#6BC8B4] font-bold ">${pkg.price}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationPackage;
