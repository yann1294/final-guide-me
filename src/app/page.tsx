"use client";
import Head from "next/head";
import { use, useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Preloader from "../components/common/Preloader";
import Topbar from "@/components/common/TopBar";
import MainBanner from "@/components/Home/MainBanner";
import Tour from "@/components/Home/Tours";
import Package from "@/components/Home/Packages";
import Achievement from "@/components/Home/Achievement";
import Featured from "@/components/Home/FeaturedTours";

import SectionHeader from "@/components/common/SectionHeader";
import usePackageStore from "@/stores/packageStore";
import { useFetchPackages } from "@/hooks/packages/usePackages";
import HomePackageCard from "@/components/Home/HomePackageCard";

export default function Home() {
  // const [loading, setLoading] = useState(false);

  const { packages } = usePackageStore();
  const { fetchPackages, loading, error } = useFetchPackages();

  useEffect(() => {
    if (packages.length === 0) {
      fetchPackages();
    }
  }, [packages, fetchPackages]);

  // Filter to only show “available” packages on the home page
  const availablePackages = packages.filter((pkg) => pkg.isAvailable);

  // useEffect(() => {
  //   setLoading(false);
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 3000);
  // }, []);
  return (
    // <>
    //   {!loading ? (
    //     <Preloader />
    //   ) : (
    <>
      <Head>
        <title>GuideMeApp</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="assets/images/favicon.png" />
      </Head>
      <MainBanner />
      <Tour />
      {/* Popular Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            topText="Popular Packages"
            mainText="Choose From Our Best Deals"
          />

          {loading && (
            <div className="flex justify-center py-8">
              <div className="circular-loader"></div>
            </div>
          )}

          {error && (
            <div className="flex justify-center py-8 text-red-500">
              Error loading packages: {error}
            </div>
          )}

          {!loading && !error && availablePackages.length === 0 && (
            <div className="text-center text-gray-600 py-8">
              No packages currently available.
            </div>
          )}

          {/* Responsive grid: 1 column on mobile, 2 on sm, 3 on lg */}
          {!loading && !error && availablePackages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePackages.map((pkg) => (
                <HomePackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Achievement />
      <Featured />
    </>
  );
}
//     </>
//   );
// }
