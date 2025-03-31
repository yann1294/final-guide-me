import React from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { SwiperOptions } from "swiper/types";


export default function Featured() {
  const featureSlider: SwiperOptions = {
    slidesPerView: "auto",
    speed: 1200,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".bannerNext",
      prevEl: ".bannerPrev",
    },
    pagination: {
      clickable: true,
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
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 2,
      },
    },
  } as SwiperOptions;

  return (
    <div className="feature-area mt-120 p-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="section-head pb-60">
              <h5>Feature Tours</h5>
              <h2>See Our Best Popular Packages</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Swiper 
            modules={[Navigation, Autoplay, EffectFade]}
            {...featureSlider} 
            className="swiper feature-slider">
              {[
                { img: "/assets/images/feature/f-1.png", title: "Group Travel Go To Bea Amsterdam", rating: "7K+", price: 150, originalPrice: 200 },
                { img: "/assets/images/feature/f-2.png", title: "Group Travel Go To Bea Amsterdam", rating: "7K+", price: 150, originalPrice: 200 },
                { img: "/assets/images/feature/f-1.png", title: "Group Travel Go To Bea Amsterdam", rating: "7K+", price: 150, originalPrice: 200 },
                { img: "/assets/images/feature/f-1.png", title: "Group Travel Go To Bea Amsterdam", rating: "7K+", price: 150, originalPrice: 200 },
              ].map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className="feature-card">
                    <div className="feature-img">
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="feature-content">
                      <a href="package-details.html" className="title">
                        {feature.title}
                      </a>
                      <h5>
                        <i className="bx bxs-star" />
                        <span> {feature.rating}</span>Rating
                      </h5>
                      <strong>
                        ${feature.price} <span>${feature.originalPrice}</span>
                      </strong>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
