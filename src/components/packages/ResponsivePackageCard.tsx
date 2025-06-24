// components/ResponsivePackageCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { PackageDTO } from "@/dto/package.dto";
import { TourDTO } from "@/dto/tour.dto"; // adjust import to your actual Tour DTO path
// adjust if your TourCard path differs
import { ContextType } from "@/lib/utils/contextUtils";
import { convertSecondsToDateString } from "@/lib/utils/dateUtils";
import TourCard from "../tours/TourCard";

interface ResponsivePackageCardProps {
  pkg: PackageDTO;
  tours: TourDTO[]; // the array of tours corresponding to this package
}

export default function ResponsivePackageCard({
  pkg,
  tours,
}: ResponsivePackageCardProps) {
  // Calculate the discounted price string if needed
  const discountedPrice =
    pkg.discount && pkg.discount > 0
      ? (pkg.price - pkg.price * (pkg.discount / 100)).toFixed(2)
      : null;

  // Determine display date: either Firestore‐style _seconds or a number
  const displayDate =
    typeof pkg.date === "object" && "_seconds" in pkg.date
      ? convertSecondsToDateString((pkg.date as any)._seconds)
      : typeof pkg.date === "number"
        ? convertSecondsToDateString(pkg.date)
        : "";

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200">
      {/* ─────────────── Left Column: Package Details ─────────────── */}
      <div className="md:w-1/3 w-full flex flex-col">
        {/* 1) Image with title overlay */}
        <Link
          href={`/packages/${pkg.id}`}
          className="relative block h-48 md:h-full w-full"
        >
          <img
            src={
              pkg.images && pkg.images.length > 0
                ? pkg.images[0]
                : "/assets/images/destination/d-1.png"
            }
            alt={pkg.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
            <h3 className="text-white text-xl font-semibold truncate">
              {pkg.name}
            </h3>
          </div>
        </Link>

        {/* 2) Price section */}
        <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
          <div>
            {discountedPrice ? (
              <div className="flex items-baseline space-x-2">
                <span className="text-gray-400 line-through">
                  ${pkg.price.toFixed(2)}
                </span>
                <span className="text-orange-500 font-bold text-2xl">
                  ${discountedPrice}
                </span>
                <span className="text-gray-600 ml-1">/Person</span>
              </div>
            ) : (
              <div className="text-orange-500 font-bold text-2xl">
                ${pkg.price.toFixed(2)}
                <span className="text-gray-600 ml-1">/Person</span>
              </div>
            )}
          </div>

          {/* 3) Info chips */}
          <div className="grid grid-cols-2 gap-2 text-sm mt-4">
            <span
              className={`px-2 py-1 rounded-full text-center font-medium ${
                pkg.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              } col-span-2`}
            >
              {pkg.isAvailable ? "Available" : "Not Available"}
            </span>

            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-center">
              {pkg.numberOfSeats} {pkg.numberOfSeats === 1 ? "seat" : "seats"}
            </span>

            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-center">
              {pkg.durationDays} {pkg.durationDays === 1 ? "day" : "days"}
            </span>

            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-center col-span-2">
              {tours.length} {tours.length === 1 ? "tour" : "tours"}
            </span>

            {displayDate && (
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-center col-span-2">
                {displayDate}
              </span>
            )}
          </div>

          {/* 4) “View Details” button */}
          <div className="mt-4">
            <Link href={`/packages/${pkg.id}`}>
              <button className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition-colors duration-150">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────────── Right Column: Tour Slider ─────────────── */}
      <div className="md:w-2/3 w-full p-4">
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          navigation={{
            nextEl: `.next-btn-${pkg.id}`,
            prevEl: `.prev-btn-${pkg.id}`,
          }}
          autoplay={{ delay: 3000 }}
          speed={800}
          loop={true}
          className="rounded-lg overflow-hidden"
        >
          {tours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <div className="p-2">
                {/* You can pass an origin prop to TourCard if needed */}
                <TourCard tour={tour} origin={ContextType.package} />
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Prev/Next Buttons */}
          <div
            className={`prev-btn-${pkg.id} absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-700 hover:text-gray-900`}
          >
            <i className="bx bx-chevron-left text-2xl"></i>
          </div>
          <div
            className={`next-btn-${pkg.id} absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-700 hover:text-gray-900`}
          >
            <i className="bx bx-chevron-right text-2xl"></i>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
