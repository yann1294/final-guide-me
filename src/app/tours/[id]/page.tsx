'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Breadcumb from '@/components/common/Breadcrumb';
import useTourStore from '@/stores/tourStore';
import { useFetchOneTour } from '@/hooks/useTours';
import useAuthStore from '@/stores/authStore';
import { useCreateStripeOrder } from '@/hooks/useBookings';
import TourGuide from '@/components/common/TourGuide';
import TourPackageContent from '@/components/common/TourAndPackageContent';
import TourPackageTab from '@/components/common/TourAndPackageTab';
import RelatedSection from '@/components/common/RelatedSection';
import BookingSummary from '@/components/common/BookingSummary';
import { ContextType } from '@/lib/utils/context.utils';
import useGuideStore from '@/stores/guidesStore';
import { useFetchOneGuide } from '@/hooks/useUsers';
import { TourDTO } from '@/dto/tour.dto';

const TourDetails = () => {
  const { currentTour: tour, tours, setCurrentTour } = useTourStore();
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tax, setTax] = useState<number>(23);
  const pathName = usePathname();
  const { fetchOneTour, loading, error } = useFetchOneTour();
  const { user } = useAuthStore();
  const { guides } = useGuideStore();
  const { fetchOneGuide } = useFetchOneGuide();
  const { createStripeOrder, loading: isCreatingOrder } =
    useCreateStripeOrder();

  useEffect(() => {
    const fetchCurrentTour = async () => {
      const currentTourId = pathName.split('/').slice(-1)[0];

      if (!tour) {
        const result = tours.find((t) => t.id === currentTourId);

        if (result) {
          setCurrentTour(result);
          
          // fetch tour guide if guide does not exist
          if (tour && !guides.get((tour as TourDTO).guide)) {
            await fetchOneGuide((tour as TourDTO).guide);
          }
        } else {
          await fetchOneTour(currentTourId);
        }
      }
    };

    fetchCurrentTour();
  }, [tour, tours, pathName, setCurrentTour, fetchOneTour]);

  return (
    <>
      <Breadcumb pageName="Tour Details" pageTitle={tour?.name} />
      {tour ? (
        <>
          <div className="package-details-wrapper pt-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="package-details">
                    <TourPackageContent
                      context={ContextType.tour}
                      resource={tour}
                    />
                    <TourPackageTab
                      resource={tour}
                      context={ContextType.tour}
                    />
                  </div>
                </div>
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
          <RelatedSection context={ContextType.package} />
        </>
      ) : (
        <></>
      )}
      <>
        {/* // Display loading state while packages are being fetched */}
        {loading && (
          <div className="circular-loader-container">
            <div className="circular-loader"></div>
          </div>
        )}

        {/* // Display error message if fetching packages fails */}
        {error && (
          <div className="circular-loader-container">Error: {error}</div>
        )}
      </>
    </>
  );
};

export default TourDetails;
