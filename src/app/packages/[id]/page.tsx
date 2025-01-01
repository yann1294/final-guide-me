"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import useGlobalStore from "@/stores/globalStore";
import { Button } from "@/components/ui/button";

import RelatedPackages from "@/components/packages/RelatedPackages";
import PackageDetails from "@/components/packages/PackageDetails";
import TourList from "@/components/packages/TourList";

const PackageDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { packages, tours } = useGlobalStore();

  const selectedPackage = packages?.find((pkg) => pkg.id === id);

  if (!selectedPackage) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Package Not Found</h2>
        <p className="text-gray-500">Please return to the packages page.</p>
        <Button onClick={() => router.push("/packages")} className="mt-4">
          Back to Packages
        </Button>
      </div>
    );
  }

  const relatedTours = selectedPackage.tours
    .map((tourId) => tours?.find((tour) => tour.id === tourId))
    .filter((tour) => !!tour);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Package Details Section */}
        <PackageDetails
          package={{
            name: selectedPackage.name,
            price: selectedPackage.price,
            durationDays: selectedPackage.durationDays,
            maxGroupSize: selectedPackage.numberOfSeats,
            location: `${selectedPackage.location.city}, ${selectedPackage.location.country}`,
            images: selectedPackage.images || [],
          }}
        />

        {/* Tours within Package Section */}
        <TourList tours={relatedTours} />

        {/* Related Packages Section */}
        <RelatedPackages currentPackageId={selectedPackage.id} />
      </div>
    </div>
  );
};

export default PackageDetailsPage;
