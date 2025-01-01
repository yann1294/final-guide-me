"use client";
import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import MainBanner from "@/components/Home/MainBanner";
import Tours from "@/components/Home/Tours";
import Testimonials from "@/components/Home/Testimonials";
import FeaturedTours from "@/components/Home/FeaturedTours";
import Packages from "@/components/Home/Packages";

const ToursList = React.lazy(() => import("@/components/tours/TourList"));

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);

  return (
    <div className="bg-white">
      {!loading ? (
        <Preloader />
      ) : (
        <>
          <MainBanner />
          <Packages />
          <Tours />
          <Testimonials />
          <FeaturedTours />
        </>
      )}
    </div>
  );
};

export default Home;
