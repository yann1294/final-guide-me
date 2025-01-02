'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/stores/globalStore';
import useTourStore from '@/stores/tourStore';
import { useFetchTours } from '@/hooks/useTours';
import packageCardData from '../../data/package_grid.json';
import { convertSecondsToDate } from '@/lib/utils/utils';

const TourList = () => {
  const router = useRouter();
  const { tours } = useTourStore();
  const { fetchTours, loading, error } = useFetchTours();

  useEffect(() => {
    // Fetch tours if not already loaded
    if (tours.length === 0) {
      fetchTours();
    }
  }, []);

  if (!tours) return null; // Suspense handles the loading skeleton

  const handleClick = (id: string) => {
    router.push(`/tours/${id}`);
  };

  return (
    <div className="container">
      <div className="row g-4">
        {tours.map((tour) => {
          return (
            <div key={tour.id} className="col-lg-4 col-md-6 col-sm-6">
              <Link href={`/tours/${tour.id}`}>
              <div className="package-card">
                <div className="package-thumb">
                  <img
                    src={tour.images ? tour.images[0] : ''}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="package-details">
                  <div className="package-info">
                    <h5>
                      {/* price when there's a discount */}
                      {tour.discount !== 0 && (
                        <>
                          <span className="text-danger crossed-line">${tour.price}</span>
                          &nbsp;&nbsp;
                          <span>
                            ${tour.price - tour.price * tour.discount}
                          </span>
                          /Per Person
                        </>
                      )}

                      {/* price when there's no discount */}
                      {tour.discount === 0 && (
                        <>
                          <span>${tour.price}</span>/Per Person
                        </>
                      )}
                    </h5>
                    <div className="duration">{tour.durationDays} {tour.durationDays === 1 ? "day" : "days"}</div>
                  </div>
                  <div className="resource-name text-black">{tour.name}</div>
                  <div className="resource-location">
                    <i className="flaticon-arrival" />
                    <Link style={{fontSize: "small"}} href={`/tours/${tour.id}`}>&nbsp;{tour.location.name}, {tour.location.city}, {tour.location.country}</Link>
                  </div>
                  <div className="card-foot d-flex justify-content-between">
                    {/* tour availability */}
                    {tour.isAvailable && (
                      <div className="card-chip package-availability">
                        Available
                      </div>
                    )}

                    {!tour.isAvailable && (
                      <div className="card-chip package-availability card-chip-not-available">
                        Available
                      </div>
                    )}
                    <div className="card-chip number-of-seats">{tour.numberOfSeats} {tour.numberOfSeats === 1 ? "seat" : "seats"}</div>
                    <div className="card-chip date">{ convertSecondsToDate(tour.date._seconds) }</div>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="pagination mt-30">
            <a href="#">
              <i className="bx bx-chevron-left" />
            </a>
            <a href="#" className="active">
              1
            </a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">
              <i className="bx bx-chevron-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourList;
