"use client";

import React, { Suspense, useEffect, useState } from "react";

import TourDetailsSkeleton from "@/components/tours/TourDetailsSkeleton";
import TourPackageContent from "@/components/common/TourAndPackageContent";
import TourPackageTab from "@/components/common/TourAndPackageTab";
import Tour from "@/components/Home/Tours";
import usePackageStore from "@/stores/packageStore";
import { usePathname } from "next/navigation";
import { useFetchOnePackage, useFetchPackageTours } from "@/hooks/usePackages";
import { PackageDTO } from "@/dto/package.dto";
import Breadcumb from "@/components/common/Breadcrumb";
import Package from "@/components/Home/Packages";

const TourDetailsContent = React.lazy(
  () => import("../../../components/tours/TourDetailsContent"),
);

export default function PackageDetails() {
  const { currentPackage: pkg, packages, tours, setCurrentPackage } = usePackageStore();
  const { fetchPackageTours } = useFetchPackageTours();
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tax, setTax] = useState<number>(23);
  const pathName = usePathname();
  const { fetchOnePackage, loading, error } = useFetchOnePackage();

  useEffect(() => {
    const fetchCurrentPackage = async () => {
      const currentPackageId = pathName.split('/').slice(-1)[0]; // Extract ID from path

      // Try to find the tour in the store
      if (!pkg) {
        const result = packages.find((t) => t.id === currentPackageId);

        if (result) {
          setCurrentPackage(result); // Update the store if the package is found
        } else {
          await fetchOnePackage(currentPackageId); // Fetch from server if not found
        }
      }

      // fetch package tours if not in store
      if (!tours.has(currentPackageId)) {
        await fetchPackageTours(currentPackageId);
      }
    };

    fetchCurrentPackage();
  }, [packages, pkg, tours, pathName, setCurrentPackage, fetchOnePackage]);
  return (
    <Suspense fallback={<TourDetailsSkeleton />}>
      <Breadcumb pageName="Package Details" pageTitle={ pkg?.name } />
      {pkg ? (
        <>
          <div className="package-details-wrapper pt-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="package-details">
                    <TourPackageContent context={"packages"} tour={pkg} />
                    <TourPackageTab tour={pkg} context={'packages'} />
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
                                <div className="field">Type</div>
                                <div className="value">Package</div>
                              </div>
                              <div className="col-lg-12 order-summary">
                                <div className="field">Price</div>
                                <div className="value">{pkg.price}</div>
                              </div>
                              <div className="col-lg-12 order-summary">
                                <div className="field">
                                  Discount ({pkg.discount}%)
                                </div>
                                <div className="value">
                                  $
                                  {pkg.price -
                                    pkg.price * (pkg.discount / 100)}
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
                                    (pkg.price +
                                      tax -
                                      pkg.price * (pkg.discount / 100))}
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
            <Package />
          </div>
        </>
      ) : null}
    </Suspense>
  );
}
