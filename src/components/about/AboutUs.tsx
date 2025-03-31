"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Mission1Image from '../../../public/assets/images/mission/mission1.jpg';
import VisionaryImage from '../../../public/assets/images/mission/Mohamed-Aw.jpg';
import Mission2Image from '../../../public/assets/images/mission/Picture5.png';

const AboutUs: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="about-wrapper mt-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="about-wrapper-left">
              <div className="about-img wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms">
                <Image src={Mission1Image} alt="Mission 1" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="about-wrapper-right section-head head-left">
              <h5>OUR MISSION</h5>
              <h2>What do we do?</h2>
              <p> GuideMe exists to connect visitors with great guides and local businesses while discovering cities.</p>
              <h2>How do we do?</h2>
              <p>The vacation plans offer the opportunity to enjoy the most outstanding touristic sites and experience the best   things cities have to offer. 
                 The guides will assist the visitors and accommodate their journey. 
                 Housing and transportation are both included in package plans, along with three succulent dishes per day.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* OUR VISION SECTION */}
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <div className="about-wrapper-right section-head head-left">
              <h5>OUR VISION</h5>
              <h2>Who are we?</h2>
              <p> Guide me was created in 2020 by Mohamed Aw.</p>
              <h2>Vision: Why do we do, what we do?</h2>
              <p> 
                The world has so much to offer, yet numerous sites are either unknown or difficultly accessible especially for foreigners.
                Every country has a potential to amaze people and provide a safe, amusing, and stress-relieving experience. 
                Our vision is of a more welcoming world where any adult can safely explore very unfamiliar part of the world without any preoccupation. Through our service, customers are fond of rich experiences and make new long-lasting memories despite the language and culture barriers.
                We value integrity, thoughtfulness and learning to guarantee a service of quality every time.
              </p>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="about-wrapper-left">
              <div className="about-img wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms">
                <Image src={VisionaryImage} alt="Visionary" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="about-wrapper-left">
              <div className="about-img wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms">
                <Image src={Mission2Image} alt="Mission 2" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
