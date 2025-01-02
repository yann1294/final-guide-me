"use client";

import React, { Suspense } from "react";

import TourDetailsSkeleton from "@/components/tours/TourDetailsSkeleton";
import TourPackageContent from "@/components/common/TourAndPackageContent";
import TourPackageTab from "@/components/common/TourAndPackageTab";
import Tour from "@/components/Home/Tours";

const TourDetailsContent = React.lazy(
  () => import("../../../components/tours/TourDetailsContent"),
);

export default function TourDetails() {
  return (
    <Suspense fallback={<TourDetailsSkeleton />}>
      <div className="package-details-wrapper pt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="package-details">
                <TourPackageContent />
                <TourPackageTab />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="package-d-sidebar">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-form">
                      <form>
                        <h5 className="package-d-head">Book This Package</h5>
                        <hr />
                        <div className="row">
                          <div className="col-lg-12 order-summary">
                            <div className="field">
                              Type
                            </div>
                            <div className="value">Package</div>
                          </div>
                          <div className="col-lg-12 order-summary">
                            <div className="field">
                              Price
                            </div>
                            <div className="value">$23</div>
                          </div>
                          <div className="col-lg-12 order-summary">
                            <div className="field">
                              Discount (5%)
                            </div>
                            <div className="value">$23</div>
                          </div>
                          <div className="col-lg-12 order-summary">
                            <div className="field">
                              People
                            </div>
                            <div className="value">01</div>
                          </div>
                          <div className="col-lg-12 order-summary">
                            <div className="field">
                              Tax
                            </div>
                            <div className="value">$23</div>
                          </div>
                          <div className="col-lg-12 order-summary">
                            <div className="field">
                              Total Price
                            </div>
                            <div className="value">$23</div>
                          </div>
                          <div className="col-lg-12 select-participants">
                            <label htmlFor="">Select number of participants</label>
                            <select defaultValue={1}
                              className="form-select"
                              aria-label="Select number of participants"
                            >
                              <option>Number of participants</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                            </select>
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
                            <img src={"/assets/images/guide/guide-2.png"} alt="" className="img-fluid" />
                            <div className="guide-info">
                              <strong>{"John Doe"}</strong>
                              <p>Tour Guide</p>
                              <a style={{color: "#ED9734"}}>Click to view profile</a>
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
        <Tour context={"tour-details"} />
      </div>
    </Suspense>
  );
}
