'use client';

import React, { useEffect } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import useTourStore from '@/stores/tourStore';
import Filter from '@/components/common/Filter';
import { useFetchTours } from '@/hooks/tours/useTours';
import SectionHeader from '@/components/common/SectionHeader';
import TourCard from '@/components/tours/TourCard';
import Pagination from '@/components/common/Pagination';

const Tours = () => {
  // Accessing the tours data from the store using the useTourStore hook
  const { tours } = useTourStore();

  // Fetching tours and handling loading and error states
  const { fetchTours, loading, error } = useFetchTours();

  useEffect(() => {
    // Fetch tours if the tours list is empty
    if (tours.length === 0) {
      fetchTours(); // Fetch the tours from the API
    }
  }, [tours, fetchTours]);

  return (
    <div className="bg-white">
      {/* Breadcrumb navigation */}
      <Breadcrumb pageName="Tours" pageTitle="Tours" />

      <div className="container">
        {/* Filter component to apply filters to the tours */}
        <Filter />
      </div>

      <div className="package-area pt-80">
        <div className="container pb-8">
          {/* Section header with a title and description */}
          <SectionHeader
            topText={'Choose Your Tour'}
            mainText={'Select The Place You Want To Visit During Your Travel'}
          />
          {/* Mapping over the tours array and rendering a TourCard for each tour */}
          <div className="row g-4">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </div>
      {/* // Display loading state while packages are being fetched */}
      {loading && <div className="circular-loader-container"><div className="circular-loader"></div></div>}
      

      {/* // Display error message if fetching packages fails */}
      {error && <div className='circular-loader-container'>Error: {error}</div>}

      {/* Pagination component to navigate through multiple pages of tours */}
      <Pagination />
    </div>
  );
};

export default Tours;
