"use client";

import React, { useState } from "react";
import useGlobalStore from "@/store/globalStore";
import { useFetchPackages } from "@/hooks/useFetchData";
import Pagination from "@/components/ui/Pagination";
import GuideArea from "@/components/about/GuideArea";
import FeaturedTours from "@/components/Home/FeaturedTours";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DestinationHeader from "@/components/packages/DestinationHeader";
import DestinationPackage from "@/components/packages/DestinationPackage";

const PACKAGES_PER_PAGE = 3;

const Destinations: React.FC = () => {
  const { packages } = useGlobalStore();
  const { isLoading } = useFetchPackages();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <LoadingSpinner message="Loading Popular Destinations..." />;
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        No Destinations Available
      </div>
    );
  }

  const indexOfLastPackage = currentPage * PACKAGES_PER_PAGE;
  const indexOfFirstPackage = indexOfLastPackage - PACKAGES_PER_PAGE;
  const currentPackages = packages.slice(
    indexOfFirstPackage,
    indexOfLastPackage,
  );

  return (
    <div className="destinations-area py-16 bg-white">
      <div className="container mx-auto px-4">
        <DestinationHeader />
        <div className="space-y-16">
          {currentPackages.map((pkg) => (
            <DestinationPackage key={pkg.id} package={pkg} />
          ))}
        </div>
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(packages.length / PACKAGES_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <GuideArea />
      <FeaturedTours />
    </div>
  );
};

export default Destinations;
