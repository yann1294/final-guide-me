"use client"
import React, { useState, useEffect } from 'react';
//@ts-ignore
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

// Importing Swiper styles separately
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Autoplay, EffectFade, Pagination]);

const Testimonials = () => {
  const router = useRouter();

  // Define interface for testimonial data
  interface Testimonial {
    id: number;
    attributes: {
      picture: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      name: string;
      title: string;
      message: string;
    };
  }

  // Dummy data for testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      attributes: {
        picture: {
          data: {
            attributes: {
              url: "https://via.placeholder.com/150", // Dummy image URL
            },
          },
        },
        name: "John Doe",
        title: "Traveller",
        message: "This is a sample testimonial message.",
      },
      // Add more dummy data here if needed
    }
  ]);

  useEffect(() => {
    // Simulate fetching testimonials from API
    const fetchTestimonials = async () => {
      // Dummy data for demonstration
      const dummyTestimonials: Testimonial[] = [
        {
          id: 1,
          attributes: {
            picture: {
              data: {
                attributes: {
                  url: "https://via.placeholder.com/150", // Dummy image URL
                },
              },
            },
            name: "John Doe",
            title: "Traveller",
            message: "This is a sample testimonial message.",
          },
          // Add more dummy data here if needed
        }
      ];

      // Set the dummy testimonials
      setTestimonials(dummyTestimonials);
    };

    // Fetch testimonials
    fetchTestimonials();
  }, []);

  // Swiper configuration
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
      nextEl: ".bannerPrev",
      prevEl: ".bannerNext",
    },
    breakpoints: {
      280: { slidesPerView: 1, navigation: false },
      480: { slidesPerView: 1, navigation: false },
      768: { slidesPerView: 2, navigation: false },
      992: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 3 },
    },
  };
  

  // Render component
  return (
    <div className="review-area mt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="section-head pb-40">
              <h5>Our Travellers Say</h5>
              <h2>What Our Travellers Say About Us</h2>
            </div>
          </div>
        </div>
        <div className="review-slider owl-carousel">
          <Swiper {...destinationSlide} className="swiper">
            <div className="swipper-wrapper">
              {/* Map through dummy testimonials */}
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="review-card" onClick={() => router.push(`/testimonials/${testimonial.id}`)}>
                    <div className="reviewer-img">
                      <Image
                        src={testimonial.attributes.picture.data.attributes.url}
                        alt={testimonial.attributes.title}
                        className="img-fluid"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="reviewer-info">
                      <h3>{testimonial.attributes.name}</h3>
                      <h5>{testimonial.attributes.title}</h5>
                      <p>{testimonial.attributes.message}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          <div className="review-pagination d-flex justify-content-center align-items-center gap-3" />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
