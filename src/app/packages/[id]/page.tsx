"use client";

import React, { useEffect, useState } from "react";

import TourPackageContent from "@/components/common/TourAndPackageContent";
import TourPackageTab from "@/components/common/TourAndPackageTab";
import Tour from "@/components/Home/Tours";
import usePackageStore from "@/stores/packageStore";
import { usePathname } from "next/navigation";
import { useFetchOnePackage, useFetchPackageTours } from "@/hooks/usePackages";
import { PackageDTO } from "@/dto/package.dto";
import Breadcumb from "@/components/common/Breadcrumb";
import Package from "@/components/Home/Packages";
import BookingSummary from "@/components/common/BookingSummary";
import { useCreateStripeOrder } from "@/hooks/useBookings";
import TourGuide from "@/components/common/TourGuide";
import useAuthStore from "@/stores/authStore";
import RelatedSection from "@/components/common/RelatedSection";
import { ContextType } from "@/lib/utils/context.utils";


export default function PackageDetails() {
  const { currentPackage: pkg, packages, tours, setCurrentPackage } = usePackageStore();
  const { fetchPackageTours } = useFetchPackageTours();
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tax, setTax] = useState<number>(23);
  const { user } = useAuthStore();
  const pathName = usePathname();
  const { fetchOnePackage, loading, error } = useFetchOnePackage();
    const { createStripeOrder, loading: isCreatingOrder } =
      useCreateStripeOrder();

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
    <>
      <Breadcumb pageName="Package Details" pageTitle={ pkg?.name } />
      {pkg ? (
         <>
         <div className="package-details-wrapper pt-120">
           <div className="container">
             <div className="row">
               <div className="col-lg-8">
                 <div className="package-details">
                   <TourPackageContent context={ContextType.package} resource={pkg} />
                   <TourPackageTab resource={pkg} context={ContextType.package} />
                 </div>
               </div>
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
                     <TourGuide />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <RelatedSection context={ ContextType.package } />
       </>
      ) : null}
    </>
  );
}
