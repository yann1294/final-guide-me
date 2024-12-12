import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TourDTO {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  location: {
    city: string;
    country: string;
  };
  images?: string[];
}

interface TourListProps {
  tours: TourDTO[];
}

const TourList: FC<TourListProps> = ({ tours }) => {
  const router = useRouter();

  if (!tours || tours.length === 0) {
    return (
      <div className="text-center my-10">
        <h2 className="text-2xl font-semibold">No Tours Available</h2>
        <p className="text-gray-500">This package currently has no tours.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-[#6BC8B4]">
        Tours in This Package
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card
            key={tour.id}
            className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => router.push(`/tours/${tour.id}`)}
          >
            <Image
              src={tour.images?.[0] || "/placeholder.jpg"}
              alt={tour.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle className="text-lg text-[#FF7F47]">
                {tour.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-primary-600 font-bold text-[#6BC8B4]">
                  ${tour.price}
                </span>
                <span className="text-[#FF7F47] text-sm">
                  {tour.durationDays} days
                </span>
              </div>
              <p className="text-[#FF7F47] text-sm">
                {tour.location.city}, {tour.location.country}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TourList;
