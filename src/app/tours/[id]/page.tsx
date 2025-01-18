'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Breadcumb from '@/components/common/Breadcrumb';
import useTourStore from '@/stores/tourStore';
import { useFetchOneTour } from '@/hooks/tours/useTours';
import useAuthStore from '@/stores/authStore';
import { useCreateStripeOrder } from '@/hooks/useBookings';
import TourGuide from '@/components/common/TourGuide';
import TourPackageContent from '@/components/common/TourAndPackageContent';
import TourPackageTab from '@/components/common/TourAndPackageTab';
import RelatedSection from '@/components/common/RelatedSection';
import BookingSummary from '@/components/common/BookingSummary';
import { ContextType } from '@/lib/utils/contextUtils';
import useUserStore from '@/stores/userStore';
import { useFetchOneGuide } from '@/hooks/useUsers';
import { TourDTO } from '@/dto/tour.dto';

// Custom hook for managing tour details
const useTourDetails = (pathName: string) => {
  const { currentTour: tour, tours, setCurrentTour } = useTourStore();
  const { tourGuides: guides } = useUserStore();
  const { fetchOneTour, loading, error } = useFetchOneTour();
  const { fetchOneGuide } = useFetchOneGuide();

  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tax, setTax] = useState<number>(23);

  useEffect(() => {
    const fetchCurrentTour = async () => {
      const currentTourId = pathName.split('/').slice(-1)[0];

      if (!tour) {
        const result = tours.find((t) => t.id === currentTourId);

        if (result) {
          setCurrentTour(result);
        } else {
          await fetchOneTour(currentTourId);
        }
      } else {
        // Fetch tour guide if guide does not exist in store
        if (!guides.get(tour.guide)) {
          await fetchOneGuide(tour.guide);
        }
      }
    };

    fetchCurrentTour();
  }, [
    tour,
    tours,
    pathName,
    setCurrentTour,
    fetchOneTour,
    fetchOneGuide,
    guides,
  ]);

  return {
    tour,
    guides,
    tours,
    loading,
    error,
    numberOfPeople,
    setNumberOfPeople,
    tax,
    setTax,
  };
};

const TourDetails = () => {
  const pathName = usePathname();
  const { user } = useAuthStore();
  const {
    tour,
    guides,
    tours,
    loading,
    error,
    numberOfPeople,
    setNumberOfPeople,
    tax,
    setTax,
  } = useTourDetails(pathName);
  const { createStripeOrder, loading: isCreatingOrder } =
    useCreateStripeOrder();

  return (
    <>
      <Breadcumb pageName="Tour Details" pageTitle={tour?.name} />
      {tour && (
        <div className="package-details-wrapper pt-120">
          <div className="container">
            <div className="row">
              {/* Left Sidebar - Content */}
              <div className="col-lg-8">
                <div className="package-details">
                  <TourPackageContent
                    context={ContextType.tour}
                    resource={tour}
                  />
                  <TourPackageTab resource={tour} context={ContextType.tour} />
                </div>
              </div>

              {/* Right Sidebar - Booking and Guide */}
              <div className="col-lg-4">
                <div className="package-d-sidebar">
                  <div className="row">
                    <BookingSummary
                      context={ContextType.tour}
                      tour={tour}
                      numberOfPeople={numberOfPeople}
                      setNumberOfPeople={setNumberOfPeople}
                      tax={tax}
                      createStripeOrder={createStripeOrder}
                      user={user}
                    />
                    <TourGuide guide={guides.get(tour.guide)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <RelatedSection tours={tours.slice(0, 3)} context={ContextType.tour} />
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
};

export default TourDetails;
