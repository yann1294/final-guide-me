import React from "react";

const TourDetailsSkeleton = () => {
  return (
    <div className="bg-white animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-8  rounded-md w-1/3 mb-6"></div>

      {/* Main Container */}
      <div className="package-details-wrapper pt-120">
        <div className="container">
          <div className="row">
            {/* Left Column: Details Skeleton */}
            <div className="col-lg-8">
              <div className="package-details">
                {/* Image Placeholder */}
                <div className="h-64  rounded-md mb-4"></div>

                {/* Title Placeholder */}
                <div className="h-6 bg-gray-300 rounded-md w-1/2 mb-4"></div>

                {/* Description Placeholder */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded-md w-full"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
                </div>

                {/* Tab Placeholder */}
                <div className="mt-6">
                  <div className="h-8 bg-gray-300 rounded-md w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-full"></div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form Skeleton */}
            <div className="col-lg-4">
              <div className="package-d-sidebar">
                <div className="p-sidebar-form">
                  {/* Title Placeholder */}
                  <div className="h-6 bg-gray-300 rounded-md w-1/3 mb-4"></div>

                  {/* Price Info Placeholder */}
                  <div className="h-8 bg-gray-300 rounded-md w-1/4 mb-4"></div>

                  {/* Availability Status Placeholder */}
                  <div className="h-4 bg-gray-300 rounded-md w-1/3 mb-6"></div>

                  {/* Button Placeholder */}
                  <div className="h-10 bg-gray-300 rounded-md w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsSkeleton;
