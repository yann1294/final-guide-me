'use client';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import Filter from '@/components/common/Filter';
import Breadcumb from '@/components/common/Breadcrumb';
import PackageHeader from '@/components/packages/PackageHeader';
import Featured from '@/components/Home/FeaturedTours';
import usePackageStore from '@/stores/packageStore';
import { useFetchPackages, useFetchPackageTours } from '@/hooks/usePackages';
import { SwiperOptions } from 'swiper/types';
import destinationCardData from '../../data/destination_card.json';
import useTourStore from '@/stores/tourStore';
import { convertSecondsToDate } from '@/lib/utils/utils';
import { packageSlideConfig } from '@/lib/utils/swipper-configs';

const Packages: React.FC = () => {
  const { packages, tours } = usePackageStore();
  const { fetchPackages, loading, error } = useFetchPackages();
  const { setCurrentTour } = useTourStore();
  const {
    fetchPackageTours,
    loading: tourLoading,
    error: tourError,
  } = useFetchPackageTours();

  useEffect(() => {
    console.log(tours);
    const fetchToursForPackages = async () => {
      console.log('Outside: Fetching tours for each package');

      // Ensure packages are available before running the loop
      if (packages.length === 0) return;

      for (const pkg of packages) {
        console.log('Inside: Fetching tours for package', pkg);
        if (!tours.has(pkg.id as string)) {
          await fetchPackageTours(pkg.id as string); // Use await to ensure tours are fetched before continuing
        }
      }
    };

    // Only call fetchPackages if needed
    if (packages.length === 0) {
      fetchPackages();
    }

    fetchToursForPackages();
  }, [packages]); // Re-run the effect when packages change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="packages-area py-16 bg-white">
      <Breadcumb pageName="Packages" pageTitle="Packages" />
      <div className="container">
        <Filter />
      </div>
      {/* package header */}
      <div className="container mx-auto px-4 pt-20">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="section-head pb-40">
              <h5>Choose Your Package</h5>
              <h2>Select Your best Package For Your Travel</h2>
            </div>
          </div>
        </div>
        {/* packages */}
        {packages.map((packageObj, index) => {
          return (
            <a
              key={index}
              href={`/packages/${packageObj.id}`}
              className="row wow fadeInUp animated"
            >
              <div className="col-lg-3 col-md-3">
                <div
                  // style={{ height: '372px' }}
                  className="package-slider-wrap"
                >
                  <img
                    style={{ objectFit: 'cover' }}
                    src={
                      packageObj.images
                        ? packageObj.images[0]
                        : '/assets/images/destination/d-1.png'
                    }
                    alt=""
                    className="img-fluid"
                  />
                  <div className="pakage-overlay text-center">
                    <strong>{packageObj.name}</strong>
                  </div>
                  <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
                    <div className="bannerNext1 swiper-btn">
                      <i className="bx bx-chevron-left"></i>
                    </div>
                    <div className="bannerPrev1 swiper-btn">
                      <i className="bx bx-chevron-right"></i>
                    </div>
                  </div>
                  <div className="package-price-details">
                    {/* price when there's a discount */}
                    {packageObj.discount !== 0 && (
                      <>
                        <div className="package-price">
                          <span className="text-danger crossed-line">
                            ${packageObj.price}
                          </span>
                          /Per Person
                        </div>
                        <div className="package-discounted-price">
                          <span>
                            $
                            {packageObj.price -
                              packageObj.price * (packageObj.discount / 100)}
                          </span>
                          /Per Person
                        </div>
                      </>
                    )}

                    {/* price when there's no discount */}
                    {packageObj.discount === 0 && (
                      <div className="package-price">
                        <span>${packageObj.price}</span>/Per Person
                      </div>
                    )}
                  </div>
                  <div className="package-card-details">
                    {/* tour availability */}
                    {packageObj.isAvailable && (
                      <div className="card-chip package-availability">
                        Available
                      </div>
                    )}

                    {!packageObj.isAvailable && (
                      <div className="card-chip package-availability card-chip-not-available">
                        Available
                      </div>
                    )}
                    <div className="card-chip number-of-seats">
                      {packageObj.numberOfSeats}{' '}
                      {packageObj.numberOfSeats === 1 ? 'seat' : 'seats'}
                    </div>
                    <div className="card-chip duration-in-days">
                      {packageObj.durationDays}{' '}
                      {packageObj.durationDays === 1 ? 'day' : 'days'}
                    </div>
                    <div className="card-chip number-of-tours">
                      {packageObj.tours.length}{' '}
                      {packageObj.tours.length === 1 ? 'tour' : 'tours'}
                    </div>
                    <div className="card-chip date">
                      {convertSecondsToDate(30001897)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9">
                <div className="row destinations-1">
                  <Swiper
                    modules={[Navigation, Autoplay, EffectFade]}
                    navigation={{
                      nextEl: '.bannerPrev1',
                      prevEl: '.bannerNext1',
                    }}
                    autoplay={true}
                    speed={1500}
                    {...packageSlideConfig}
                    className="swipper"
                  >
                    <div className="swipper-wrapper">
                      {tours.get(packageObj.id as string)?.map((tour) => {
                        return (
                          <SwiperSlide key={tour.id}>
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
                                        <span className="text-danger crossed-line">
                                          ${tour.price}
                                        </span>
                                        &nbsp;&nbsp;
                                        <br />
                                        <span>
                                          $
                                          {tour.price -
                                            tour.price * (tour.discount / 100)}
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
                                  <div className="duration text-black">
                                    {tour.durationDays}{' '}
                                    {tour.durationDays === 1 ? 'day' : 'days'}
                                  </div>
                                </div>
                                <div className="resource-name text-black">
                                  {tour.name}
                                </div>
                                <div className="resource-location">
                                  <i className="flaticon-arrival" />
                                  <Link
                                    style={{ fontSize: 'small' }}
                                    href={`/tours/${tour.id}`}
                                  >
                                    &nbsp;{tour.location.name},{' '}
                                    {tour.location.city},{' '}
                                    {tour.location.country}
                                  </Link>
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
                                  <div className="card-chip number-of-seats">
                                    {tour.numberOfSeats}{' '}
                                    {tour.numberOfSeats === 1
                                      ? 'seat'
                                      : 'seats'}
                                  </div>
                                  <div className="card-chip date">
                                    {convertSecondsToDate(tour.date._seconds)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </div>
                  </Swiper>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Packages;
