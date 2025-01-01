"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import useGlobalStore from "@/stores/globalStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Packages: React.FC = () => {
  const { packages } = useGlobalStore();
  const router = useRouter();

  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">No Popular Packages Found</h2>
        <p className="text-gray-600">Check back later for updated packages.</p>
      </div>
    );
  }

  return (
    <div className="packages-area py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h5 className="text-lg font-bold text-[#FF7F47]">
            Popular Packages
          </h5>
          <h2 className="text-3xl font-bold text-gray-800">
            Discover Our Best Packages
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`/packages/${pkg.id}`)}
            >
              <Image
                //src={pkg.images?.[0] || "/placeholder.jpg"}
                src="https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
                alt={pkg.name}
                width={400}
                height={250}
                className="rounded-t-lg object-cover w-full h-48"
              />
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#FF7F47]">
                  {pkg.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-4">
                  {pkg.description.length > 80
                    ? `${pkg.description.substring(0, 80)}...`
                    : pkg.description}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#FF7F47] font-bold">${pkg.price}</span>
                  <Button size="sm" className="bg-[#6BC8B4]">
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
