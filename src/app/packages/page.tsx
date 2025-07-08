"use client";
import React, { useEffect } from "react";

// Importing necessary components
import Filter from "@/components/common/Filter";
import Breadcumb from "@/components/common/Breadcrumb";
import usePackageStore from "@/stores/packageStore";
import Pagination from "@/components/common/Pagination";
import {
  useFetchPackages,
  useFetchPackageTours,
} from "@/hooks/packages/usePackages";
import ResponsivePackageCard from "@/components/packages/ResponsivePackageCard";

const Packages: React.FC = () => {
  // Accessing packages and tours data from the store
  const { packages, tours } = usePackageStore();

  // Fetching packages and tours with their respective loading and error states
  const {
    fetchPackages,
    loading: pkgLoading,
    error: pkgError,
  } = useFetchPackages();
  const {
    fetchPackageTours,
    loading: tourLoading,
    error: tourError,
  } = useFetchPackageTours();

  // useEffect to fetch packages and their corresponding tours
  useEffect(() => {
    // Step 1: fetch all packages if not already loaded
    if (packages.length === 0) {
      fetchPackages();
      return;
    }

    // Step 2: once we have packages, only fetch tours if `pkg.tours` is a non‐empty array
    packages.forEach(async (pkg) => {
      const alreadyHave = tours.has(pkg.id!);
      const hasAnyTourIds = Array.isArray(pkg.tours) && pkg.tours.length > 0;

      if (hasAnyTourIds && !alreadyHave) {
        await fetchPackageTours(pkg.id!);
      }
    });
  }, [packages, fetchPackages, fetchPackageTours, tours]); // Re-run the effect whenever packages change

  // Only show the “available” packages
  const availablePackages = packages.filter((pkg) => pkg.isAvailable);

  return (
    <div className="packages-area py-16 bg-white">
      {/* Breadcrumb section for navigation */}
      <Breadcumb pageName="Packages" pageTitle="Packages" />

      <div className="container">
        {/* Filter component for filtering the displayed packages */}
        <Filter />
      </div>

      {/* Section header for the packages list */}
      <div className="container mx-auto px-4 py-8">
        {/* Show loading spinner while packages are being fetched */}
        {pkgLoading && (
          <div className="flex justify-center py-8">
            <div className="circular-loader"></div>
          </div>
        )}

        {/* Show error if package fetch failed */}
        {pkgError && (
          <div className="text-center text-red-500 py-8">
            Error loading packages: {pkgError}
          </div>
        )}

        {/* Once not loading and no error, render the available‐packages list */}
        {!pkgLoading && !pkgError && (
          <>
            {availablePackages.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                No packages currently available.
              </div>
            ) : (
              availablePackages.map((pkg) => {
                // Pull this package’s tours from Zustand (or default to empty array)
                const toursForThisPackage =
                  usePackageStore.getState().tours.get(pkg.id!) || [];

                return (
                  <div key={pkg.id} className="mb-12">
                    <ResponsivePackageCard
                      pkg={pkg}
                      tours={toursForThisPackage}
                    />
                  </div>
                );
              })
            )}

            {/* If tours are still loading (for any package), show a spinner */}
            {tourLoading && (
              <div className="flex justify-center py-8">
                <div className="circular-loader"></div>
              </div>
            )}
            {tourError && (
              <div className="text-center text-red-500 py-4">
                Error loading tours: {tourError}
              </div>
            )}

            {/* Pagination (always shown if there are available packages) */}
            {availablePackages.length > 0 && <Pagination />}
          </>
        )}
      </div>
    </div>
  );
};

export default Packages;
