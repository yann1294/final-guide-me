'use client';
import React, { useEffect } from 'react';

// Importing necessary components
import Filter from '@/components/common/Filter';
import Breadcumb from '@/components/common/Breadcrumb';
import usePackageStore from '@/stores/packageStore';
import PackageCard from '@/components/packages/PackageCard';
import SectionHeader from '@/components/common/SectionHeader';
import Pagination from '@/components/common/Pagination';
import { useFetchPackages, useFetchPackageTours } from '@/hooks/packages/usePackages';

const Packages: React.FC = () => {
  // Accessing packages and tours data from the store
  const { packages, tours } = usePackageStore();

  // Fetching packages and tours with their respective loading and error states
  const { fetchPackages, loading, error } = useFetchPackages();
  const {
    fetchPackageTours,
    loading: tourLoading,
    error: tourError,
  } = useFetchPackageTours();

  // useEffect to fetch packages and their corresponding tours
  useEffect(() => {
    

    const fetchToursForPackages = async () => {
      

      // Ensure packages are available before running the loop
      if (packages.length === 0) return;

      for (const pkg of packages) {
        
        if (!tours.has(pkg.id as string)) {
          await fetchPackageTours(pkg.id as string); // Fetch tours for the current package
        }
      }
    };

    // Fetch packages if they are not already loaded
    if (packages.length === 0) {
      fetchPackages();
    }

    // Fetch tours for the packages
    fetchToursForPackages();
  }, [packages]); // Re-run the effect whenever packages change

  return (
    <div className="packages-area py-16 bg-white">
      {/* Breadcrumb section for navigation */}
      <Breadcumb pageName="Packages" pageTitle="Packages" />

      <div className="container">
        {/* Filter component for filtering the displayed packages */}
        <Filter />
      </div>

      {/* Section header for the packages list */}
      <div className="container mx-auto px-4 pt-20">
        <SectionHeader
          topText={'Choose Your Package'}
          mainText={'Select Your Best Package For Your Travel'}
        />

        {/* Mapping over the packages and rendering each one with PackageCard */}
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
      {/* // Display loading state while packages are being fetched */}
      {loading && <div className="circular-loader-container"><div className="circular-loader"></div></div>}
      

      {/* // Display error message if fetching packages fails */}
      {error && <div className='circular-loader-container'>Error: {error}</div>}

      <Pagination />
    </div>
  );
};

export default Packages;
