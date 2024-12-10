"use client";
import React, { useState, useEffect } from "react";
//@ts-ignore
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Dummy data for guides
const dummyGuides = [
  {
    id: 1,
    attributes: {
      name: "Guide 1",
      picture: {
        data: {
          attributes: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        },
      },
    },
  },
  {
    id: 2,
    attributes: {
      name: "Guide 2",
      picture: {
        data: {
          attributes: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        },
      },
    },
  },
  {
    id: 3,
    attributes: {
      name: "Guide 3",
      picture: {
        data: {
          attributes: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        },
      },
    },
  },
];

SwiperCore.use([Navigation, Autoplay, EffectFade, Pagination]);

const GuideArea: React.FC = () => {
  const router = useRouter();

  const [guides, setGuides] = useState(dummyGuides);

  useEffect(() => {
    // Dummy API call simulation
    const fetchGuides = async () => {
      try {
        // Simulating API response delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGuides(dummyGuides);
        console.log("guides", dummyGuides);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGuides();
  }, []);

  const destinationSlide = {
    slidesPerView: "auto" as const, // Set slidesPerView as "auto"
    speed: 1200,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".review-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".bannerPrev1",
      prevEl: ".bannerNext1",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        navigation: false,
      },
      480: {
        slidesPerView: 1,
        navigation: false,
      },
      768: {
        slidesPerView: 2,
        navigation: false,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  };

  return (
    <div className="guide-wrapper mt-120 bg-white">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="section-head head-left pb-40">
              <h5>Tour Guide</h5>
              <h2>All Guides have 5 Years+ Expertise</h2>
            </div>
          </div>
        </div>
        <div className="guide-slider owl-carousel">
          <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
            <div className="bannerNext1 swiper-btn">
              <i className="bx bx-chevron-left"></i>
            </div>
            <div className="bannerPrev1 swiper-btn">
              <i className="bx bx-chevron-right"></i>
            </div>
          </div>
          <Swiper {...destinationSlide} className="swiper">
            <div className="swiper-wrapper">
              {guides.map((guide) => (
                <SwiperSlide key={guide.id}>
                  <div
                    className="guide-card"
                    onClick={() => router.push(`/guides/${guide.id}`)}
                  >
                    <div className="guide-thumb">
                      <Image
                        src={guide.attributes.picture.data.attributes.url}
                        alt={guide.attributes.name}
                        className="img-fluid"
                        width={200}
                        height={200}
                      />
                      <div className="guide-info">
                        <strong>{guide.attributes.name}</strong>
                        <p>Tour Guide</p>
                        {/* Add social links here if needed */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GuideArea;
