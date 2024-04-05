"ue client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import 'swiper/css/autoplay';
import createSlideOptions from '../utils/CreateSlideOptions';
//@ts-ignore
import SwiperCore, { Autoplay, EffectFade, Navigation } from 'swiper';

SwiperCore.use([Navigation, Autoplay, EffectFade]);

const Destinations: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const destinationSlide = createSlideOptions([
    {
      width: 280, slidesPerView: 1,
      roundLengths: false,
      pagination: {
        el: '',
        clickable: false
      },
      breakpoints: {}
    },
    {
      width: 480, slidesPerView: 2, spaceBetween: 10,
      roundLengths: false,
      pagination: {
        el: '',
        clickable: false
      },
      breakpoints: {}
    },
    {
      width: 500, slidesPerView: 2,
      roundLengths: false,
      pagination: {
        el: '',
        clickable: false
      },
      breakpoints: {}
    },
    {
      width: 768, slidesPerView: 2,
      roundLengths: false,
      pagination: {
        el: '',
        clickable: false
      },
      breakpoints: {}
    },
    {
      width: 992, slidesPerView: 2,
      roundLengths: false,
      pagination: {
        el: '',
        clickable: false
      },
      breakpoints: {}
    },
    {
      width: 1200, slidesPerView: 3,
      roundLengths: false,
      pagination: {
        el: '',
        clickable: false
      },
      breakpoints: {}
    },
  ]);

  const slider1 = {
    navigation: {
      nextEl: '.bannerPrev1',
      prevEl: '.bannerNext1',
    },
    autoplay: true,
    speed: 1500,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dummy data for API call
        const dummyData = [
          {
            id: 1,
            attributes: {
              title: 'Destination 1',
              image: {
                data: { attributes: { url: '/bassamBeach.jpg' } },
              },
              tours: {
                data: [
                  {
                    attributes: {
                      title: 'Tour 1',
                      image: { data: { attributes: { url: '/bassamBeach.jpg' } } },
                    },
                  },
                  {
                    attributes: {
                      title: 'Tour 2',
                      image: { data: { attributes: { url: '/bassamBeach.jpg' } } },
                    },
                  },
                ],
              },
            },
          },
          // Add more dummy destinations as needed
        ];
        setData(dummyData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
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
        {data.map((packages) => (
          <div key={packages.id} className="row">
            <div className="col-lg-3 col-md-3">
              <div className="package-slider-wrap">
                {packages.attributes.image && (
                  <Image
                    src={packages.attributes.image.data.attributes.url}
                    alt={packages.attributes.title}
                    className="img-fluid"
                    width={250}
                    height={250}
                  />
                )}
                <div className="pakage-overlay">
                  <strong>{packages.attributes.title}</strong>
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
            <div className="col-lg-9 col-md-9">
              <div className="row destinations-1">
                <Swiper {...destinationSlide} {...slider1} className="swipper">
                  <div className="swipper-wrapper">
                    {packages.attributes.tours.data.map((tour: any, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="package-card">
                          <div className="package-thumb">
                            {tour.attributes.image && (
                              <Image
                                src={tour.attributes.image.data.attributes.url}
                                alt=""
                                className="img-fluid"
                                width={90}
                                height={90}
                              />
                            )}
                          </div>
                          <div className="package-details">
                            <h3 onClick={() => router.push(`/destinations/${packages.id}`)}>
                              <i className="flaticon-arrival" />
                              {tour.attributes.title}
                            </h3>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
