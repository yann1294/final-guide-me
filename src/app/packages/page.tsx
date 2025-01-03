'use client';
import React, { useEffect } from 'react';

// Importing necessary components
import Filter from '@/components/common/Filter';
import Breadcumb from '@/components/common/Breadcrumb';
import usePackageStore from '@/stores/packageStore';
import { useFetchPackages, useFetchPackageTours } from '@/hooks/usePackages';
import PackageCard from '@/components/packages/PackageCard';
import SectionHeader from '@/components/common/SectionHeader';

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
    console.log(tours);
    
    const fetchToursForPackages = async () => {
      console.log('Outside: Fetching tours for each package');

      // Ensure packages are available before running the loop
      if (packages.length === 0) return;

      for (const pkg of packages) {
        console.log('Inside: Fetching tours for package', pkg);
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

  // Display loading state while packages are being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if fetching packages fails
  if (error) {
    return <div>Error: {error}</div>;
  }

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
          topText={"Choose Your Package"} 
          mainText={"Select Your Best Package For Your Travel"} 
        />

        {/* Mapping over the packages and rendering each one with PackageCard */}
        {packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
      </div>
    </div>
  );
};

export default Packages;
