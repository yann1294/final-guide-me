// About.tsx

import AboutWrap from '@/components/about/AboutWrap';
import GuideArea from '@/components/about/GuideArea';
import Breadcrumb from '@/components/common/Breadcrumb';
import Testimonials from '@/components/Home/Testimonials';
import React from 'react';

const About: React.FC = () => {
  return (
    <div className='bg-gray-200'>
      <Breadcrumb pageName="About Us" pageTitle="About Us"/>
      <AboutWrap/>
      <GuideArea/>
      <Testimonials/>
    </div>
  );
};

export default About;
