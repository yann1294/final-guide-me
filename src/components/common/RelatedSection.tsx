// components/tours/TourRelated.tsx

import React from 'react';
import Tour from '@/components/Home/Tours';
import { CONTEXT } from '@/lib/utils/context.utils';

const RelatedSection = ({ context }: { context: CONTEXT }) => {
  return (
    <div className="related-section">
      <Tour context={'tour-details'} />
    </div>
  );
};

export default RelatedSection;
