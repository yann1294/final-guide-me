"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import destinationCardData from "../../data/destination_card.json";
import Link from "next/link"
import Filter from "@/components/common/Filter";
import Breadcumb from "@/components/common/Breadcrumb";
import PackageHeader from "@/components/packages/PackageHeader";
import Featured from "@/components/Home/FeaturedTours";
import { SwiperOptions } from "swiper/types";


const Packages: React.FC = () => {
  const destinationSlide = {
    slidesPerView: "auto",
    spaceBetween: 20,

    loop: true,
    roundLengths: true,
    pagination: {
      el: ".swiper-pagination",
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
        slidesPerView: 3,
      },
    },
  } as SwiperOptions;
  const slider1 = {
    navigation: {
      nextEl: ".bannerPrev1",
      prevEl: ".bannerNext1",
    },
    autoplay: true,
    speed: 1500
  };
  const slider2 = {
    navigation: {
      nextEl: ".bannerPrev2",
      prevEl: ".bannerNext2",
    },

  };
  const slider3 = {
    navigation: {
      nextEl: ".bannerPrev3",
      prevEl: ".bannerNext3",
    },

  };
  const slider4 = {
    navigation: {
      nextEl: ".bannerPrev4",
      prevEl: ".bannerNext4",
    },

  };
  const slider5 = {
    navigation: {
      nextEl: ".bannerPrev5",
      prevEl: ".bannerNext5",
    },

  };

  return (
    <div className="packages-area py-16 bg-white">
      <Breadcumb pageName="Packages" pageTitle="Packages" />
      <div className="container">
        {/* Filters */}
       <Filter />
       </div>
      <div className="container mx-auto px-4">
        <PackageHeader />
        <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="package-slider-wrap">
                <img
                  src="/assets/images/destination/d-1.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="pakage-overlay">
                  <strong>Spain</strong>
                </div>
                <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
                  <div className="bannerNext1 swiper-btn">
                    <i className="bx bx-chevron-left"></i>
                  </div>
                  <div className="bannerPrev1 swiper-btn">
                    <i className="bx bx-chevron-right"></i>
                  </div>
                </div>
                <div className="package-price-details">
                  <div className="package-price">
                    <span>$1500</span> /Per Person
                  </div>
                  <div className="package-discounted-price">
                    <span>$1200</span> /Per Person
                  </div>
                </div>
                <div className="package-card-details">
                  <div className="card-chip package-availability">5 days</div>
                  <div className="card-chip package-availability">Available</div>
                  <div className="card-chip number-of-seats">4 seats</div>
                  <div className="card-chip date">29/09/29</div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="row destinations-1">
                <Swiper {...destinationSlide}modules={[Navigation, Autoplay, EffectFade]} className="swipper">
                  <div className="swipper-wrapper">
                    {destinationCardData.slice(0, 4).map((data) => {
                      const { id, image, title, price } = data;
                      return (
                        <SwiperSlide key={id}>
                          <div className="package-card">
                            <div className="package-thumb">
                              <img src={image} alt="" className="img-fluid" />
                            </div>
                            <div className="package-details">
                              <div className="package-info">
                                <h5>
                                  <span>${price}</span>/Per Person
                                </h5>
                                <div className="duration">3 days</div>
                              </div>
                              <div className="resource-name">
                                Name of the tour
                              </div>
                              <div className="resource-location">
                                <i className="flaticon-arrival" />
                                <Link href="/package-details">&nbsp;{title}</Link>
                              </div>
                              <div className="card-foot d-flex justify-content-between">
                                <div className="card-chip package-availability">Available</div>
                                <div className="card-chip number-of-seats">4 seats</div>
                                <div className="card-chip date">29/09/29</div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-9">
              <div className="row destinations-2">
                <Swiper {...destinationSlide}className="swipper" modules={[Navigation, Autoplay, EffectFade]}>
                  <div className="swipper-wrapper">
                    {destinationCardData.slice(4, 8).map((data) => {
                      const { id, image, title, rating, price } = data;
                      return (
                        <SwiperSlide key={id}>
                          <div className="package-card">
                            <div className="package-thumb">
                              <img src={image} alt="" className="img-fluid" />
                            </div>
                            <div className="package-details">
                              <div className="package-info">
                                <h5>
                                  <span>${price}</span>/Per Person
                                </h5>
                              </div>
                              <h3>
                                <i className="flaticon-arrival" />
                                <Link href="/package-details">&nbsp;{title}</Link>
                              </h3>
                              <div className="package-rating">
                                <i className="bx bxs-star" />
                                <strong>
                                  <span>{rating}</span> Rating
                                </strong>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </div>
                </Swiper>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="package-slider-wrap">
                <img
                  src="/assets/images/destination/d-2.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="pakage-overlay">
                  <strong>Italy</strong>
                </div>
                <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
                  <div className="bannerNext2 swiper-btn">
                    <i className="bx bx-chevron-left"></i>
                  </div>
                  <div className="bannerPrev2 swiper-btn">
                    <i className="bx bx-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="package-slider-wrap">
                <img
                  src="/assets/images/destination/d-3.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="pakage-overlay">
                  <strong>Dubai</strong>
                </div>
                <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
                  <div className="bannerNext3 swiper-btn">
                    <i className="bx bx-chevron-left"></i>
                  </div>
                  <div className="bannerPrev3 swiper-btn">
                    <i className="bx bx-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="row destinations-1">
                <Swiper {...destinationSlide}modules={[Navigation, Autoplay, EffectFade]} className="swipper">
                  {destinationCardData.slice(8, 12).map((data) => {
                    const { id, image, title, rating, price } = data;
                    return (
                      <SwiperSlide key={id}>
                        <div className="package-card">
                          <div className="package-thumb">
                            <img src={image} alt="" className="img-fluid" />
                          </div>
                          <div className="package-details">
                            <div className="package-info">
                              <h5>
                                <span>${price}</span>/Per Person
                              </h5>
                            </div>
                            <h3>
                              <i className="flaticon-arrival" />
                              <Link href="/package-details">&nbsp;{title}</Link>
                            </h3>
                            <div className="package-rating">
                              <i className="bx bxs-star" />
                              <strong>
                                <span>{rating}</span> Rating
                              </strong>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-9">
              <div className="row destinations-2">
                <Swiper {...destinationSlide}className="swipper" modules={[Navigation, Autoplay, EffectFade]}>
                  <div className="swipper-wrapper">
                    {destinationCardData.slice(12, 16).map((data) => {
                      const { id, image, title, rating, price } = data;
                      return (
                        <SwiperSlide key={id}>
                          <div className="package-card">
                            <div className="package-thumb">
                              <img src={image} alt="" className="img-fluid" />
                            </div>
                            <div className="package-details">
                              <div className="package-info">
                                <h5>
                                  <span>${price}</span>/Per Person
                                </h5>
                              </div>
                              <h3>
                                <i className="flaticon-arrival" />
                                <Link href="/package-details">&nbsp;{title}</Link>
                              </h3>
                              <div className="package-rating">
                                <i className="bx bxs-star" />
                                <strong>
                                  <span>{rating}</span> Rating
                                </strong>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </div>
                </Swiper>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="package-slider-wrap">
                <img
                  src="/assets/images/destination/d-2.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="pakage-overlay">
                  <strong>France</strong>
                </div>
                <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
                  <div className="bannerNext4 swiper-btn">
                    <i className="bx bx-chevron-left"></i>
                  </div>
                  <div className="bannerPrev4 swiper-btn">
                    <i className="bx bx-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="package-slider-wrap">
                <img
                  src="/assets/images/destination/d-1.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="pakage-overlay">
                  <strong>Switzerland</strong>
                </div>
                <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
                  <div className="bannerNext5 swiper-btn">
                    <i className="bx bx-chevron-left"></i>
                  </div>
                  <div className="bannerPrev5 swiper-btn">
                    <i className="bx bx-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="row destinations-1">
                <Swiper {...destinationSlide}modules={[Navigation, Autoplay, EffectFade]} className="swipper">
                  <div className="swipper-wrapper">
                    {destinationCardData.slice(16, 20).map((data) => {
                      const { id, image, title, rating, price } = data;
                      return (
                        <SwiperSlide key={id}>
                          <div className="package-card">
                            <div className="package-thumb">
                              <img src={image} alt="" className="img-fluid" />
                            </div>
                            <div className="package-details">
                              <div className="package-info">
                                <h5>
                                  <span>${price}</span>/Per Person
                                </h5>
                              </div>
                              <h3>
                                <i className="flaticon-arrival" />
                                <Link href="/package-details">&nbsp;{title}</Link>
                              </h3>
                              <div className="package-rating">
                                <i className="bx bxs-star" />
                                <strong>
                                  <span>{rating}</span> Rating
                                </strong>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
      </div>
      <Featured />
    </div>
  );
};

export default Packages;
