import GuideArea from '@/components/about/GuideArea';
import Breadcrumb from '@/components/common/Breadcrumb';
import ContactCards from '@/components/contact/ContactCards';
import FaqSection from '@/components/faq/FaqSection';
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className=''>
      <Breadcrumb pageName="Contact Us" pageTitle="Contact Us"/>
      <div className="contact-wrapper pt-120 bg-white">
        <ContactCards />
        <div className="container">
          <div className="contact-inputs pt-120">
            <div className="row">
              <div className="col-lg-6">
                <div className="contact-details">
                  <h5 className="contact-d-head">Get In Touch</h5>
                  <p>
                    Suspendisse dolor risus, congue ac diam id, viverra
                    facilisis dolor. Cras nec purus sagittis, varius tortor at,
                    maximus erat. Sed at tellus id tellus lobortis dictum.
                    Mauris dignissim, turpis vitae ullamcorper fermentum, sapien
                    arcu aliquam arcu, in viverra quam est ac ex. Cras sed
                    lectus eu.
                  </p>
                  <ul className="office-clock">
                    <li>
                      <div className="clock-icon">
                        <i className="flaticon-clock-1" />
                      </div>
                      <div className="clock-info">
                        <h5>Open Hour</h5>
                        <p>
                          Sat - Thu At <br /> 10.00Am to 10.00PM
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="clock-icon">
                        <i className="flaticon-clock-1" />
                      </div>
                      <div className="clock-info">
                        <h5>Close Hour</h5>
                        <p>Friday Office Close</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-form">
                  <form action="#" method="post">
                    <h5 className="contact-d-head">Contact Us</h5>
                    <div className="row">
                      <div className="col-lg-6">
                        <input type="text" placeholder="Full Name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" placeholder="Subject" />
                      </div>
                      <div className="col-lg-6">
                        <input type="email" placeholder="Your Email" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" placeholder="Phone" />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          cols={30}
                          rows={7}
                          placeholder="Write Message"
                          defaultValue={""}
                        />
                      </div>
                      <div className="col-lg-12">
                        <input type="submit" value="Submit Now" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      <GuideArea />
       {/* Call to Action Section */}
       <div className="container mt-120">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#ed9734]">Become a Guide with Us</h2>
          <p className="mt-2 text-black text-lg">Join our team and start sharing your knowledge with travelers!</p>
          <button className="bg-[#6BC8B4] hover:bg-[#ed9734] text-white font-bold py-2 px-4 rounded mt-4">
            Register Now
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ContactPage;
