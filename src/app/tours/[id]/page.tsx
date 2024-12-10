"use client";

import React, { Suspense } from "react";

import TourDetailsSkeleton from "@/components/tours/TourDetailsSkeleton";

const TourDetailsContent = React.lazy(
  () => import("../../../components/tours/TourDetailsContent"),
);

export default function TourDetails() {
  return (
    <div className="bg-white">
      <Suspense fallback={<TourDetailsSkeleton />}>
        <TourDetailsContent />
      </Suspense>
    </div>
  );
}
