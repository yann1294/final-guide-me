"use client";
import React, { useState } from 'react'
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
export default function AboutWrap() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="about-wrapper mt-120">
  <div className="container">
    <div className="row">
      <div className="col-lg-7 col-md-12">
        <div className="about-wrapper-left">
          <div className="about-img wow fadeInLeft animated" data-wow-delay="0ms" data-wow-duration="1500ms">
            <img src="/assets/images/about-1.png" alt="" className="img-fluid" />
          </div>
          <div className="about-video wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms"> 
            <img src="/assets/images/about-2.png" alt="" className="img-fluid" />
            <div className="video-icon" onClick={() => setOpen(true)}
                  style={{ cursor: "pointer" }}><i className="flaticon-play-button-arrowhead" />
            </div>
          </div>
         
        </div>
      </div>
      <div className="col-lg-5 col-md-12">
        <div className="about-wrapper-right section-head head-left">
        <h5>About GuideMe</h5>
        <h2>GuideMe is Your Trusted <br /> Travel Companion.</h2>
          <p>GuideMe exists to connect visitors with great guides and local businesses while discovering cities.
                We value integrity, thoughtfulness, and learning to guarantee a service of quality every time.
                The world has so much to offer, yet numerous sites are either unknown or difficult to access, especially for foreigners.
                Every country has the potential to amaze people and provide a safe, amusing, and stress-relieving experience.
                Our vision is of a more welcoming world where anyone can safely explore very unfamiliar parts of the world without any preoccupation.
                Through our service, customers experience rich and long-lasting memories despite language and culture barriers.</p>
          <ul className="about-list">
            <li><i className="flaticon-double-checking" /> Donec viverra orci On a</li>
            <li><i className="flaticon-double-checking" /> Donec viverra orci On a</li>
            <li><i className="flaticon-double-checking" /> Donec viverra orci On a</li>
            <li><i className="flaticon-double-checking" /> Donec viverra orci On a</li>
            <li><i className="flaticon-double-checking" /> Donec viverra orci On a</li>
            <li><i className="flaticon-double-checking" /> Donec viverra orci On a</li>
          </ul>
        </div>
      </div>
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId="TboWOSW7qCI"
          onClose={() => setOpen(false)}
        />
      </React.Fragment>
    </div>
  </div>
</div>

  )
}
