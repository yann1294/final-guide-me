import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import useGlobalStore from "@/stores/globalStore";
import { useFetchTours } from "@/hooks/useTours";
import useTourStore from "@/stores/tourStore";

const Tours = () => {
  const router = useRouter();
  const { tours } = useTourStore();
  const { error, loading, fetchTours } = useFetchTours(); // Fetch tours and populate the global store
  const MAX_TOURS = 6; // Limit the number of tours displayed

  useEffect(() => {
    if(!tours) fetchTours();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/tours/${id}`);
  };

  if (loading) {
    return (
      <div className="package-area pt-12">
        <div className="container">
          <p className="text-center text-gray-500">Loading tours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="package-area pt-12">
        <div className="container">
          <p className="text-center text-red-500">Failed to load tours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="package-area pt-12">
      <div className="container">
        {/* Section Header */}
        <div className="section-head text-center mb-10">
          <h5 className="text-lg font-medium text-gray-600">
            Choose Your Tour
          </h5>
          <h2 className="text-2xl font-bold text-gray-800 pb-8">
            Select The Place You Want To Visit During Your Travel
          </h2>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours?.slice(0, MAX_TOURS).map((tour) => (
            <div
              key={tour.id}
              className="package-card bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleClick(tour.id)}
            >
              {/* Tour Image */}
              <div className="package-thumb">
                <Image
                  src={
                    tour.images?.[0] ||
                    "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
                  }
                  alt={tour.name}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={300}
                />
              </div>

              {/* Tour Details */}
              <div className="p-4">
                <h3 className="pakage-overlay text-lg font-semibold mb-2">
                  <strong>{tour.name}</strong>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {/* Handle undefined description */}
                  {tour.description
                    ? tour.description.length > 80
                      ? `${tour.description.substring(0, 80)}...`
                      : tour.description
                    : "No description available."}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-500">
                    ${tour.price}
                  </span>
                  <span className="text-sm text-green-500 font-bold">
                    {tour.durationDays} days
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;
