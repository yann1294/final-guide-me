// components/tours/TourRelated.tsx

import React from 'react';
import Tour from '@/components/Home/Tours';
import { CONTEXT, ContextType } from '@/lib/utils/contextUtils';
import { PackageDTO } from '@/dto/package.dto';
import { TourDTO } from '@/dto/tour.dto';
import PackageCard from '../packages/PackageCard';
import TourCard from '../tours/TourCard';
import SectionHeader from './SectionHeader';

const RelatedSection = ({
  context,
  tours,
  packages,
}: {
  context: CONTEXT;
  packages?: PackageDTO[];
  tours?: TourDTO[];
}) => {
  return (
    <div className="container related-section pt-20">
      <SectionHeader topText='' mainText={"Related " + (context === ContextType.tour ? "Tours" : "Packages")} />
      <div className="row g-4">
        {context === ContextType.package &&
          packages?.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        {context === ContextType.tour &&
          tours?.map((tour) => <TourCard key={tour.id} tour={tour} />)}
      </div>
    </div>
  );
};

export default RelatedSection;
