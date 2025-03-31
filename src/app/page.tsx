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

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);
  return (
    <>
      {!loading ? (
        <Preloader />
      ) : (
        <>
          <Head>
            <title>TourX - Tours and Travel TextJs Template </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
            <link rel="icon" href="assets/images/favicon.png" />
          </Head>
          <MainBanner />
          <Tour />
          <Package />
          <Achievement />
          <Featured />
        </>
      )}
    </>
  );
}
