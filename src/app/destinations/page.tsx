"use client"
import React, { useEffect, useState } from "react";
//@ts-ignore
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
import "swiper/css/autoplay";
import Image from "next/image";
import Breadcrumb from "@/components/common/Breadcrumb";
import GuideArea from "@/components/about/GuideArea";
import FeaturedTours from "@/components/Home/FeaturedTours";
import { useRouter } from "next/navigation";

SwiperCore.use([Navigation, Autoplay, EffectFade]);

const Destinations: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
  
    const slider1 = {
      navigation: {
        nextEl: ".bannerPrev1",
        prevEl: ".bannerNext1",
      },
      autoplay: true,
      speed: 1500,
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Dummy data for API call
          const dummyData: any[] = [
            { id: 1, title: "Package 1", /* Other package properties */ },
            { id: 2, title: "Package 2", /* Other package properties */ },
            // Add more dummy packages as needed
          ];
          setData(dummyData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
    return (
      <div>
        <Breadcrumb pageName="Packages" pageTitle="Packages" />
        <div className="destinations-area pt-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="section-head pb-40">
                  <h5>Popular Destinations</h5>
                  <h2>Select Our Best Popular Destinations Packages</h2>
                </div>
              </div>
            </div>
            {data?.map((packages) => (
              <div key={packages.id} className="row">
                {/* Render package */}
                <div className="col-lg-3 col-md-3">
                  <div className="package-slider-wrap">
                    <div className="pakage-overlay">
                      <strong>{packages.title}</strong>
                    </div>
                    <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
                      <div className="bannerNext1 swiper-btn">
                        <i className="bx bx-chevron-left"></i>
                      </div>
                      <div className="bannerPrev1 swiper-btn">
                        <i className="bx bx-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <GuideArea />
        <FeaturedTours />
      </div>
    );
  };
  
  export default Destinations;
  
