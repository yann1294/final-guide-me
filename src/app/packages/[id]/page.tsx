'use client';

import React, { useEffect, useState } from 'react';
import TourPackageContent from '@/components/common/TourAndPackageContent';
import TourPackageTab from '@/components/common/TourAndPackageTab';
import Breadcumb from '@/components/common/Breadcrumb';
import BookingSummary from '@/components/common/BookingSummary';
import TourGuide from '@/components/common/TourGuide';
import RelatedSection from '@/components/common/RelatedSection';
import { useCreateStripeOrder } from '@/hooks/useBookings';
import { usePathname } from 'next/navigation';
import usePackageStore from '@/stores/packageStore';
import useGuideStore from '@/stores/guidesStore';
import { ContextType } from '@/lib/utils/context.utils';
import { useFetchOnePackage, useFetchPackageTours } from '@/hooks/usePackages';
import { useFetchOneGuide } from '@/hooks/useUsers';
import useAuthStore from '@/stores/authStore';

const usePackageDetails = (pathName: string) => {
  const {
    currentPackage: pkg,
    packages,
    tours,
    setCurrentPackage,
  } = usePackageStore();
  const { guides } = useGuideStore();
  const { fetchPackageTours } = useFetchPackageTours();
  const { fetchOnePackage, loading, error } = useFetchOnePackage();
  const { fetchOneGuide } = useFetchOneGuide();

  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tax, setTax] = useState<number>(23);

  useEffect(() => {
    const fetchCurrentPackage = async () => {
      const currentPackageId = pathName.split('/').slice(-1)[0];

      // Check if package exists in store or fetch it
      if (!pkg) {
        const result = packages.find((p) => p.id === currentPackageId);
        if (result) {
          setCurrentPackage(result);
          if (result.guide && !guides.get(result.guide)) {
            await fetchOneGuide(result.guide);
          }
        } else {
          await fetchOnePackage(currentPackageId);
        }
      }

      // Fetch package tours if not already in store
      if (!tours.has(currentPackageId)) {
        await fetchPackageTours(currentPackageId);
      }
    };

    fetchCurrentPackage();
  }, [
    packages,
    pkg,
    tours,
    pathName,
    setCurrentPackage,
    fetchOnePackage,
    fetchPackageTours,
    fetchOneGuide,
  ]);

  return {
    pkg,
    loading,
    error,
    numberOfPeople,
    setNumberOfPeople,
    tax,
    setTax,
    guides,
  };
};

export default function PackageDetails() {
  const pathName = usePathname();
  const { user } = useAuthStore();
  const {
    pkg,
    loading,
    error,
    numberOfPeople,
    setNumberOfPeople,
    tax,
    setTax,
    guides,
  } = usePackageDetails(pathName);
  const { createStripeOrder, loading: isCreatingOrder } =
    useCreateStripeOrder();

  return (
    <>
      <Breadcumb pageName="Package Details" pageTitle={pkg?.name} />
      {pkg && (
        <div className="package-details-wrapper pt-120">
          <div className="container">
            <div className="row">
              {/* Left Sidebar - Content */}
              <div className="col-lg-8">
                <div className="package-details">
                  <TourPackageContent
                    context={ContextType.package}
                    resource={pkg}
                  />
                  <TourPackageTab
                    resource={pkg}
                    context={ContextType.package}
                  />
                </div>
              </div>

              {/* Right Sidebar - Booking and Guide */}
              <div className="col-lg-4">
                <div className="package-d-sidebar">
                  <div className="row">
                    <BookingSummary
                      tour={pkg}
                      numberOfPeople={numberOfPeople}
                      setNumberOfPeople={setNumberOfPeople}
                      tax={tax}
                      createStripeOrder={createStripeOrder}
                      user={user}
                    />
                    <TourGuide guide={guides.get(pkg.guide)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <RelatedSection context={ContextType.package} />
      {loading && (
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      )}

      {error && (
        <div className="circular-loader-container">
          <div>Error: {error}</div>
        </div>
      )}
    </>
  );
}
