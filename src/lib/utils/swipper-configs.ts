import { SwiperOptions } from "swiper/types";

export const packageSlideConfig = {
    slidesPerView: 'auto',
    spaceBetween: 20,

    loop: true,
    roundLengths: true,
    pagination: {
      el: '.swiper-pagination',
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