import Breadcrumb from '@/components/common/Breadcrumb';
import ContactCards from '@/components/contact/ContactCards';
import FaqSection from '@/components/faq/FaqSection';
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className='bg-gray-200'>
      <Breadcrumb pageName="Contact Us" pageTitle="Contact Us"/>
      <ContactCards/>
      <FaqSection/>
    </div>
  );
};

export default ContactPage;
