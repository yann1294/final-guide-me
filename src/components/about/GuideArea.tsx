"use client";
import React from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
export default function GuideArea() {
  const destinationSlide = {
    slidesPerView: 'auto',
    speed: 1200,
    spaceBetween: 20,
    // autoplay: true,
    loop: true,
    // roundLengths: true,
    pagination: {
      el: '.review-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.bannerPrev1',
      prevEl: '.bannerNext1',
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
  } as SwiperOptions;
  return (
    <div className="guide-wrapper mt-40">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="section-head head-left pb-40">
              <h5>Tour Guide</h5>
              <h2>All Guide Are 5 Year Expart In Travel</h2>
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
          <Swiper
            modules={[Navigation, Autoplay, EffectFade, Pagination]}
            {...destinationSlide}
            className="swiper"
          >
            <div className="swiper-wrapper">
              <SwiperSlide>
                <div className="guide-card">
                  <div className="guide-thumb">
                    <img
                      src="/assets/images/guide/guide-1.png"
                      alt=""
                      className="img-fluid"
                    />
                    <div className="guide-info">
                      <strong>Sakura Chen</strong>
                      <p>Tour Guide</p>
                      <ul className="guide-links">
                        <li>
                          <a href="#">
                            <i className="bx bxl-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-whatsapp" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <div className="guide-card">
                  <div className="guide-thumb">
                    <img
                      src="/assets/images/guide/guide-3.png"
                      alt=""
                      className="img-fluid"
                    />
                    <div className="guide-info">
                      <strong>Sakura Chen</strong>
                      <p>Tour Guide</p>
                      <ul className="guide-links">
                        <li>
                          <a href="#">
                            <i className="bx bxl-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-whatsapp" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="guide-card">
                  <div className="guide-thumb">
                    <img
                      src="/assets/images/guide/guide-4.png"
                      alt=""
                      className="img-fluid"
                    />
                    <div className="guide-info">
                      <strong>Sakura Chen</strong>
                      <p>Tour Guide</p>
                      <ul className="guide-links">
                        <li>
                          <a href="#">
                            <i className="bx bxl-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-whatsapp" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <div className="guide-card">
                  <div className="guide-thumb">
                    <img
                      src="/assets/images/guide/guide-2.png"
                      alt=""
                      className="img-fluid"
                    />
                    <div className="guide-info">
                      <strong>Sakura Chen</strong>
                      <p>Tour Guide</p>
                      <ul className="guide-links">
                        <li>
                          <a href="#">
                            <i className="bx bxl-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bxl-whatsapp" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
