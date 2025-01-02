'use client';

import React, { Suspense, useEffect, useState } from 'react';

import TourDetailsSkeleton from '@/components/tours/TourDetailsSkeleton';
import TourPackageContent from '@/components/common/TourAndPackageContent';
import TourPackageTab from '@/components/common/TourAndPackageTab';
import Tour from '@/components/Home/Tours';
import useTourStore from '@/stores/tourStore';
import { parse } from 'path';
import { usePathname } from 'next/navigation';
import { useFetchOneTour } from '@/hooks/useTours';
import Breadcumb from '@/components/common/Breadcrumb';

const TourDetailsContent = React.lazy(
  () => import('../../../components/tours/TourDetailsContent'),
);

export default function TourDetails() {
  const { currentTour: tour, tours, setCurrentTour } = useTourStore();
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tax, setTax] = useState<number>(23);
  const pathName = usePathname();
  const { fetchOneTour, loading, error } = useFetchOneTour();

  useEffect(() => {
    const fetchCurrentTour = async () => {
      const currentTourId = pathName.split('/').slice(-1)[0]; // Extract ID from path

      // Try to find the tour in the store
      if (!tour) {
        const result = tours.find((t) => t.id === currentTourId);

        if (result) {
          setCurrentTour(result); // Update the store if the tour is found
        } else {
          await fetchOneTour(currentTourId); // Fetch from server if not found
        }
      }
    };

    fetchCurrentTour();
  }, [tour, tours, pathName, setCurrentTour, fetchOneTour]);

  return (
    <Suspense fallback={<TourDetailsSkeleton />}>
      <Breadcumb pageName="Tour Details" pageTitle={ tour?.name } />
      {tour ? (
        <>
          <div className="package-details-wrapper pt-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="package-details">
                    <TourPackageContent tour={tour} />
                    <TourPackageTab tour={tour} context={'tours'} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="package-d-sidebar">
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <div className="p-sidebar-form">
                          <form>
                            <h5 className="package-d-head">Book This Tour</h5>
                            <hr />
                            <div className="row">
                              <div className="col-lg-12 order-summary">
                                <div className="field">Type</div>
                                <div className="value">Tour</div>
                              </div>
                              <div className="col-lg-12 order-summary">
                                <div className="field">Price</div>
                                <div className="value">{tour.price}</div>
                              </div>
                              <div className="col-lg-12 order-summary">
                                <div className="field">
                                  Discount ({tour.discount}%)
                                </div>
                                <div className="value">
                                  $
                                  {tour.price -
                                    tour.price * (tour.discount / 100)}
                                </div>
                              </div>
                              <div className="col-lg-12 order-summary">
                                <div className="field">People</div>
                                <div className="value">
                                  {numberOfPeople.toString().padStart(2, '0')}
                                </div>
                              </div>
                              <div className="col-lg-12 order-summary">
                                <div className="field">Tax</div>
                                <div className="value">${tax}</div>
                              </div>
                              <div className="col-lg-12 order-summary">
                                <div className="field">Total Price</div>
                                <div className="value">
                                  $
                                  {numberOfPeople *
                                    (tour.price +
                                      tax -
                                      tour.price * (tour.discount / 100))}
                                </div>
                              </div>
                              <div className="col-lg-12 select-participants">
                                <label htmlFor="">
                                  Select number of participants
                                </label>
                                <input
                                  className="form-select mt-1"
                                  aria-label="Select number of participants"
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      setNumberOfPeople(
                                        parseInt(e.target.value),
                                      );
                                    } else {
                                      setNumberOfPeople(1);
                                    }
                                  }}
                                  value={numberOfPeople}
                                  min={1}
                                  type="number"
                                />
                              </div>
                              <hr />
                              <div className="col-lg-12">
                                <input type="submit" value="Pay with stripe" />
                              </div>
                              <div className="col-lg-12">
                                <input type="submit" value="Pay with Paypal" />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="p-sidebar-organizer mt-40">
                          <h5 className="package-d-head">Guide By</h5>
                          <div className="col-12">
                            <a href="/organizer-details">
                              <div className="guide-card">
                                <div className="guide-thumb">
                                  <img
                                    src={'/assets/images/guide/guide-2.png'}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="guide-info">
                                    <strong>{'John Doe'}</strong>
                                    <p>Tour Guide</p>
                                    <a style={{ color: '#ED9734' }}>
                                      Click to view profile
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* Ads section */}
                      {/* <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-banner mt-40">
                      <img
                        src="/assets/images/sidebar-banner.png"
                        alt=""
                        className="img-fluid"
                      />
                      <div className="sidebar-banner-overlay">
                        <div className="overlay-content">
                          <h3>Get 50% Off In Dubai Tour</h3>
                          <div className="sidebar-banner-btn">
                            <Link href="/package-detail">
                              <a>
                              Book Now
                              </a>
                              </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="related-section">
            <Tour context={'tour-details'} />
          </div>
        </>
      ) : null}
    </Suspense>
  );
}
