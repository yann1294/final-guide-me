"use client";

import React, { Suspense, useEffect } from "react";
//import GuideArea from "@/components/about/GuideArea";

import ToursSkeleton from "@/components/tours/TourSkeleton";
import Breadcrumb from "@/components/common/Breadcrumb";
import useTourStore from "@/stores/tourStore";

const ToursList = React.lazy(() => import("../../components/tours/TourList"));

const Tours = () => {
  return (
    <div className="bg-white">
      <Breadcrumb pageName="Tours" pageTitle="Tours" />
      <div className="package-area pt-80">
        <div className="container pb-8">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-head pb-45 text-center">
                <h5>Choose Your Tour</h5>
                <h2>Select The Place You Want To Visit During Your Travel</h2>
              </div>
            </div>
          </div>
          <Suspense fallback={<ToursSkeleton />}>
            <ToursList />
          </Suspense>
          {/* <GuideArea /> */}
        </div>
      </div>
    </div>
  );
};

export default Tours;
