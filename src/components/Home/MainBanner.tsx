import React from 'react';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import SwiperCore, { Autoplay, EffectFade, Navigation } from 'swiper';


SwiperCore.use([Navigation, Autoplay, EffectFade]);

const MainBanner: React.FC = () => {

  const bannerSliderOptions: SwiperCore.SwiperOptions = {
    slidesPerView: 'auto',
    speed: 1200,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    roundLengths: true,
    navigation: {
      nextEl: '.bannerNext',
      prevEl: '.bannerPrev',
    },
    effect: 'fade',
  };

  return (
    <div className="main-banner">
      <Swiper {...bannerSliderOptions} className="swipper">
        <div className="swipper-wrapper banner-slider">
          <SwiperSlide className="slider-item slider-item-1">
            <div className="container">
              <div
                className="slider-content wow fadeInLeft animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <h2>Amazing Tour In Senegal</h2>
                <h5>7 Days, 8 Night Tour</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slider-item slider-item-2">
            <div className="container">
              <div
                className="slider-content wow fadeInLeft animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <h2>Amazing Tour In Ivory Coast</h2>
                <h5>7 Days, 8 Night Tour</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slider-item slider-item-3">
            <div className="container">
              <div
                className="slider-content wow fadeInLeft animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <h2>Amazing Tour In Puerto Rico</h2>
                <h5>7 Days, 8 Night Tour</h5>
              </div>
            </div>
          </SwiperSlide>
        </div>
        <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
          <div className="bannerNext swiper-btn">
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="bannerPrev swiper-btn">
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default MainBanner;
