"use client"
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.css';
import ReactPlayer from 'react-player/youtube';
import Image from 'next/image';
import About1 from '../../../public/assets/images/about-1.png';
import { useRouter } from 'next/navigation';

const AboutWrap: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="about-wrapper mt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="about-wrapper-left">
              <div className="about-img wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms">
                <Image src={About1} alt="About GuideMe" className="img-fluid" />
              </div>
              <div className="about-video wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                <ReactPlayer url='https://youtu.be/-Y-om3QnJR4' />
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="about-wrapper-right section-head head-left">
              <h5>About GuideMe</h5>
              <h2>GuideMe is Your Trusted <br /> Travel Companion.</h2>
              <p>
                GuideMe exists to connect visitors with great guides and local businesses while discovering cities.
                We value integrity, thoughtfulness, and learning to guarantee a service of quality every time.
                The world has so much to offer, yet numerous sites are either unknown or difficult to access, especially for foreigners.
                Every country has the potential to amaze people and provide a safe, amusing, and stress-relieving experience.
                Our vision is of a more welcoming world where anyone can safely explore very unfamiliar parts of the world without any preoccupation.
                Through our service, customers experience rich and long-lasting memories despite language and culture barriers.
              </p>
              <div className="about-wrapper-btn">
                <a className="btn-common" onClick={() => router.push('/aboutDetails')}>Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWrap;
