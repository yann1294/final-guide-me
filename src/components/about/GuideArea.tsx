"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dummy data for guides
const dummyGuides = [
  {
    id: 1,
    attributes: {
      name: "Alex Johnson",
      expertise: "Historical Tours",
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
      name: "Emily Chen",
      expertise: "Adventure Tours",
      picture: {
        data: {
          attributes: {
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        },
      },
    },
  },
  {
    id: 3,
    attributes: {
      name: "Michael Rodriguez",
      expertise: "Food & Culture Tours",
      picture: {
        data: {
          attributes: {
            url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        },
      },
    },
  },
];

const GuideArea: React.FC = () => {
  const router = useRouter();
  const [guides, setGuides] = useState(dummyGuides);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGuides(dummyGuides);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);

  const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full z-10 cursor-pointer bg-white bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg focus:outline-none`}
        onClick={onClick}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </div>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute top-1/2 right-0 -translate-y-1/2 translate-x-full z-10 cursor-pointer bg-white bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg focus:outline-none`}
        onClick={onClick}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Meet Our Expert Tour Guides
          </h2>
          <p className="text-gray-600">
            With over 5 years of experience, our guides are ready to make your
            journey unforgettable
          </p>
        </div>
        <div className="relative px-6">
          <Slider {...settings}>
            {guides.map((guide) => (
              <div key={guide.id} className="px-2">
                <div
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => router.push(`/guides/${guide.id}`)}
                >
                  <div className="relative h-64">
                    <Image
                      src={guide.attributes.picture.data.attributes.url}
                      alt={guide.attributes.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-opacity duration-300 hover:opacity-75"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {guide.attributes.name}
                    </h3>
                    <p className="text-gray-600">
                      {guide.attributes.expertise}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default GuideArea;
