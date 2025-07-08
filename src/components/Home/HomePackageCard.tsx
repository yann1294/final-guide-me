// components/HomePackageCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { PackageDTO } from "@/dto/package.dto";
import { convertSecondsToDateString } from "@/lib/utils/dateUtils"; // adjust import if your util lives elsewhere

interface HomePackageCardProps {
  pkg: PackageDTO;
}

export default function HomePackageCard({ pkg }: HomePackageCardProps) {
  // Calculate discounted price if there is a discount
  const discountedPrice =
    pkg.discount && pkg.discount > 0
      ? (pkg.price - pkg.price * (pkg.discount / 100)).toFixed(2)
      : null;

  // Convert your package date (assuming pkg.date is a Firestore timestamp-like object)
  // If pkg.date is a Firestore object, you may need to adjust this to extract seconds.
  // For example: convertSecondsToDateString(pkg.date._seconds)
  const displayDate =
    typeof pkg.date === "object" && "_seconds" in pkg.date
      ? convertSecondsToDateString((pkg.date as any)._seconds)
      : typeof pkg.date === "number"
        ? convertSecondsToDateString(pkg.date)
        : "";

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200 h-full">
      {/* 1) Image + Name overlay */}
      <Link href={`/packages/${pkg.id}`} className="relative block h-48">
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
          <h3 className="text-white text-lg font-semibold truncate">
            {pkg.name}
          </h3>
        </div>
      </Link>

      {/* 2) Main content */}
      <div className="flex-1 flex flex-col justify-between p-4 space-y-3">
        {/* 2.a) Price section */}
        <div>
          {discountedPrice ? (
            <div className="flex items-baseline space-x-2">
              <span className="text-gray-400 line-through">
                ${pkg.price.toFixed(2)}
              </span>
              <span className="text-orange-500 font-bold text-xl">
                ${discountedPrice}
              </span>
              <span className="text-gray-600">/Person</span>
            </div>
          ) : (
            <div className="text-orange-500 font-bold text-xl">
              ${pkg.price.toFixed(2)}
              <span className="text-gray-600">/Person</span>
            </div>
          )}
        </div>

        {/* 2.b) Info pills */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          {/* Availability */}
          <span
            className={`px-2 py-1 rounded-full text-center font-medium
              ${
                pkg.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            {pkg.isAvailable ? "Available" : "Not Available"}
          </span>

          {/* Seats */}
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-center">
            {pkg.numberOfSeats} {pkg.numberOfSeats === 1 ? "seat" : "seats"}
          </span>

          {/* Duration */}
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-center">
            {pkg.durationDays} {pkg.durationDays === 1 ? "day" : "days"}
          </span>

          {/* Date */}
          {displayDate && (
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-center">
              {displayDate}
            </span>
          )}
        </div>

        {/* 2.c) “View Details” button */}
        <div className="mt-3">
          <Link href={`/packages/${pkg.id}`}>
            <button className="w-full text-center bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-150">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
