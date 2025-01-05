import React from 'react';
import Link from 'next/link';
import { PackageDTO } from '@/dto/package.dto';
import { TourDTO } from '@/dto/tour.dto';
import usePackageStore from '@/stores/packageStore';
import useTourStore from '@/stores/tourStore';
import { CONTEXT, ContextType } from '@/lib/utils/contextUtils';
import { convertSecondsToDate } from '@/lib/utils/dateUtils';

interface TourPackageTabProps {
  resource: TourDTO | PackageDTO;
  context: CONTEXT;
}

export default function TourPackageTab({ resource, context }: TourPackageTabProps) {
  const { tours } = usePackageStore();
  const { setCurrentTour } = useTourStore();

  return (
    <>
      <div className="package-tab">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          {/* Information Tab */}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <i className="flaticon-info" />
              Information
            </button>
          </li>

          {/* Tour Activities Tab (only for tours) */}
          {context === ContextType.tour && (
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-activities-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-activities"
                type="button"
                role="tab"
                aria-controls="pills-activities"
                aria-selected="false"
              >
                <i className="flaticon-clipboard" />
                Tour Activities
              </button>
            </li>
          )}

          {/* Package Tours Tab (only for packages) */}
          {context === ContextType.package && (
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-tours-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-tours"
                type="button"
                role="tab"
                aria-controls="pills-tours"
                aria-selected="false"
              >
                <i className="flaticon-gallery" />
                Tours
              </button>
            </li>
          )}
        </ul>

        <div className="tab-content p-tab-content" id="pills-tabContent">
          {/* Information Tab Content */}
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content-1">
                  <div className="p-overview">
                    <h5>
                      {context === ContextType.tour ? 'Tour' : 'Package'} description
                    </h5>
                    <p>{resource.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Activities Tab Content (only for tours) */}
          <div
            className="tab-pane fade"
            id="pills-activities"
            role="tabpanel"
            aria-labelledby="pills-activities-tab"
          >
            <div className="tab-content-2">
              <div className="row">
                <div className="col-lg-12">
                  <ul className="p-timeline">
                    {context === ContextType.tour &&
                      Object.entries((resource as TourDTO).activities).map(
                        ([activityId, activity], index) => (
                          <li key={activityId}>
                            <div className="timeline-index">
                              <div className="index-circle">
                                <h5>
                                  {(index + 1).toString().padStart(2, '0')}
                                </h5>
                              </div>
                            </div>
                            <div className="timeline-content">
                              <h5>
                                Activity {index + 1}: {activity.name}
                              </h5>
                              <strong>
                                Duration: {activity.durationHours}{' '}
                                {activity.durationHours === 1
                                  ? 'hour'
                                  : 'hours'}
                              </strong>
                              <ul>
                                <li />
                                <li>
                                  <i className="flaticon-arrival" />
                                  {activity.location.name}, {activity.location.city}, {activity.location.country}
                                </li>
                                <li />
                                <li>
                                  <i className="bx bx-check" />
                                  Specialized Bilingual Guide
                                </li>
                                <li />
                                <li>
                                  <i className="bx bx-check" />
                                  Private Transport
                                </li>
                                <li />
                                <li>
                                  <i className="bx bx-check" />
                                  Entrance Fees
                                </li>
                                <li />
                                <li>
                                  <i className="bx bx-check" />
                                  Box Lunch, Water, Dinner, and Snacks
                                </li>
                              </ul>
                            </div>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Package Tours Tab Content (only for packages) */}
          <div
            className="tab-pane fade"
            id="pills-tours"
            role="tabpanel"
            aria-labelledby="pills-tours-tab"
          >
            <div className="tab-content-2">
              <div className="row">
                {context === ContextType.package &&
                  tours.get(resource.id as string)?.map((tour) => (
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
                            <div className="resource-name text-black">
                              {tour.name}
                            </div>
                            <div className="resource-location">
                              <i className="flaticon-arrival" />
                              <Link
                                style={{ fontSize: 'small' }}
                                href={`/tours/${tour.id}`}
                              >
                                &nbsp;{tour.location.name}, {tour.location.city},{' '}
                                {tour.location.country}
                              </Link>
                            </div>
                            <div className="card-foot d-flex justify-content-between">
                              {/* Tour availability */}
                              {tour.isAvailable ? (
                                <div className="card-chip package-availability">
                                  Available
                                </div>
                              ) : (
                                <div className="card-chip package-availability card-chip-not-available">
                                  Not Available
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
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
