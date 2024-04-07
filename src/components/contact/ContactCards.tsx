import React from 'react';
import GuideArea from '../about/GuideArea';

const ContactCards: React.FC = () => {
  return (
    <div className="contact-cards">
      {/* Contact Info Section */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="flaticon-arrival" />
            </div>
            <div className="contact-info">
              <h5>Address</h5>
              <p>625 Bluffview Dr Lawrenceville, Georgia 30043</p>
            </div>
          </div>
          {/* Email & Phone */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="flaticon-customer-service" />
            </div>
            <div className="contact-info">
              <h5>Email &amp; Phone</h5>
              <p>(+1) 4049660715 staff@guidemeapp.net</p>
            </div>
          </div>
          {/* Social Media */}
          <div className="contact-card">
            <div className="contact-icon">
              <i className="flaticon-thumbs-up" />
            </div>
            <div className="contact-info">
              <h5>Social Media</h5>
              <ul className="contact-icons flex space-x-2">
                <li>
                  <a href="#">
                    <i className="bx bxl-instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bxl-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bxl-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bxl-whatsapp" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="container mt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-500">Become a Guide with Us</h2>
          <p className="mt-2 text-gray-200 text-lg">Join our team and start sharing your knowledge with travelers!</p>
          <button className="bg-green-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded mt-4">
            Register Now
          </button>
        </div>
      </div>
      <GuideArea/>
    </div>
  );
};

export default ContactCards;
