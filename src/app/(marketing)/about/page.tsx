// About.tsx

import AboutUs from '@/components/about/AboutUs';
import AboutWrap from '@/components/about/AboutWrap';
import GuideArea from '@/components/about/GuideArea';
import Breadcrumb from '@/components/common/Breadcrumb';
import React from 'react';

const About: React.FC = () => {
  return (
    <div className=''>
      <Breadcrumb pageName="About Us" pageTitle="About Us"/>
      <AboutWrap/>
      <AboutUs/>
      <GuideArea/>
    </div>
  );
};

export default About;
