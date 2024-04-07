"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import GuideArea from '@/components/about/GuideArea';
import Image from 'next/image';
import Link from 'next/link';

// Define types
interface Tour {
    id: number;
    attributes: {
      price: number;
      title: string;
      image?: {
        data?: {
          attributes?: {
            url: string;
          };
        };
      };
    };
  }

const Tours = () => {
  const router = useRouter();

  const [data, setData] = useState<Tour[]>([]);

  useEffect(() => {
    // Dummy data for API call
    const dummyData: Tour[] = [
      {
        id: 1,
        attributes: {
          price: 100,
          title: "Tour 1",
          image: {
            data: {
              attributes: {
                url: "/bassamBeach.jpg"
              }
            }
          }
        }
      },
      {
        id: 2,
        attributes: {
          price: 150,
          title: "Tour 2",
          image: {
            data: {
              attributes: {
                url: "/bassamBeach.jpg"
              }
            }
          }
        }
      },
      // Add more dummy data as needed
    ];

    setData(dummyData);
  }, []);

  const handleClick = (id: number) => {
    router.push(`/tours/${id}`);
  };

  return (
    <>
      <Breadcrumb pageName="Tours" pageTitle="Tours" />
      <div className="package-area pt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-head pb-45">
                <h5>Choose Your Tour</h5>
                <h2>Select The Place You Want To Visit During Your Travel</h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {data.map((tour) => (
              <div key={tour.id} className="col-lg-4 col-md-6 col-sm-6">
                <div className="package-card" onClick={() => handleClick(tour.id)}>
                  <div className="package-thumb">
                    {tour.attributes.image && (
                      <Image
                        src={tour.attributes.image?.data?.attributes?.url || ""}
                        alt={tour.attributes.title}
                        className="img-fluid"
                        width={200}
                        height={200}
                      />
                    )}
                  </div>
                  <div className="package-details">
                    <div className="package-info">
                      <h5>
                        <span>${tour.attributes.price}</span>/Per Person
                      </h5>
                    </div>
                    <h3>
                      <i className="flaticon-arrival" />
                      <Link href={`/tours/${tour.id}`}>{tour.attributes.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GuideArea />
    </>
  );
};

export default Tours;
