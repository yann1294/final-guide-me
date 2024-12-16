import React, { useEffect, useState } from 'react';
import Link from 'next/link';
//@ts-ignore
import SwiperCore, { Autoplay,EffectFade, Navigation, Pagination,} from 'swiper';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

SwiperCore.use([Navigation, Autoplay, EffectFade, Pagination]);

interface Tour {
  id: number;
  attributes: {
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    title: string;
    price: number;
  };
}

const FeaturedTours: React.FC = () => {
  const router = useRouter();

  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Dummy data for API call
        const dummyData: Tour[] = [
          {
            id: 1,
            attributes: {
              image: { data: { attributes: { url: "/bassamBeach.jpg" } } },
              title: 'Tour 1',
              price: 100,
            },
          },
          {
            id: 2,
            attributes: {
              image: { data: { attributes: { url: "/bassamBeach.jpg" } } },
              title: 'Tour 2',
              price: 200,
            },
          },
          // Add more dummy data as needed
        ];
        setTours(dummyData);
        console.log('featuredtours', dummyData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTours();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/tours/${id}`);
  };

  const destinationSlide = {
    slidesPerView: "auto" as const, // Ensure slidesPerView is of type "auto"
    speed: 1200,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".review-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".bannerPrev",
      prevEl: ".bannerNext",
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
    <>
      <div className="feature-area-2 p-80 mt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-head feature-head-2 pb-40">
                <h5>Featured Tours</h5>
                <h2>See Our Most Popular Tours</h2>
              </div>
            </div>
          </div>
          <div className="feature-slider-2">
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
                {tours.map((tour) => (
                  <SwiperSlide key={tour.id}>
                    <div
                      className="feature-card-2"
                      onClick={() => handleClick(tour.id)}
                    >
                      <div className="feature-thumb">
                        {tour.attributes.image && (
                          <Image
                            src={tour.attributes.image.data.attributes.url}
                            alt={tour.attributes.title}
                            className="img-fluid"
                            width={200}
                            height={200}
                          />
                        )}
                        <div className="feature-price">
                          <h5>
                            <span> ${tour.attributes.price}</span>
                            {/* / Couple */}
                          </h5>
                        </div>
                      </div>
                      <div className="feature-details">
                        <h3>
                          <i className="flaticon-arrival" />
                          <Link href={`/tours/${tour.id}`}>
                            &nbsp;{tour.attributes.title}
                          </Link>
                        </h3>
                      </div>
                      <div className="feature-card-review">
                        <Link className="feature-btn" href={`/tours/${tour.id}`}>
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedTours;
