import Link from 'next/link';
import React from 'react';
import packageData from '../../data/package_grid.json';
import useTourStore from '@/stores/tourStore';
import { convertSecondsToDate } from '@/lib/utils/utils';
export default function Tour({ context = 'home' }) {
  const { tours, setCurrentTour } = useTourStore();

  return (
    <div
      className="package-area"
      style={{ paddingTop: context === 'home' ? '120px' : '50px' }}
    >
      <div className="container">
        <div className="row">
          {context === 'home' && (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-head pb-45">
                <h5>Choose Your Tour</h5>
                <h2>Select Your best Tour For Your Travel</h2>
              </div>
            </div>
          )}
          {context.includes('details') && (
            <div className="text-start" style={{ paddingBottom: '20px' }}>
              <h3>
                <b>Other {context.split('-')[0]}s</b>
              </h3>
            </div>
          )}
        </div>
        <div className="row g-4">
          {tours.slice(0, 6).map((tour) => {
            return (
              <div key={tour.id} className="col-lg-4 col-md-6 col-sm-6">
                <Link
                  onClick={() => setCurrentTour(tour)}
                  href={`/tours/${tour.id}`}
                >
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
                        <span
                          style={{ fontSize: 'small' }}
                        >
                          &nbsp;{tour.location.name}, {tour.location.city},{' '}
                          {tour.location.country}
                        </span>
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
                          {tour.numberOfSeats === 1 ? 'seat' : 'seats'}
                        </div>
                        <div className="card-chip date">
                          {convertSecondsToDate(tour.date._seconds)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
