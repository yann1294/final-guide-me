import { TourDTO } from "@/dto/tour.dto";
import { CONTEXT, ContextType } from "@/lib/utils/contextUtils";
import { convertSecondsToDate } from "@/lib/utils/utils";
import useTourStore from "@/stores/tourStore";
import Link from "next/link";

export default function TourCard({ tour, origin = ContextType.tour }: { tour: TourDTO, origin?: CONTEXT}) {
    const { setCurrentTour } = useTourStore();

    return (
        <div className={ "wow fadeInUp animated " + (origin === ContextType.tour ? "col-lg-4 col-md-6 col-sm-6" : "") }>
            <Link onClick={() => setCurrentTour(tour)} href={`/tours/${tour.id}`}>
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
                          { origin === ContextType.package && <br />}
                          <span>
                            ${tour.price - (tour.price * (tour.discount / 100))}
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
                    <div className="duration text-black">{tour.durationDays} {tour.durationDays === 1 ? "day" : "days"}</div>
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
}