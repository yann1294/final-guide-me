// components/tours/TourGuide.tsx

import { GuideDTO } from '@/dto/guide.dto';
import Link from 'next/link';
import React from 'react';

const TourGuide = ({ guide }: { guide: GuideDTO | undefined }) => {
  return (
    <div className="col-lg-12 col-md-6">
      <div className="p-sidebar-organizer mt-40">
        <h5 className="package-d-head">Guide By</h5>
        {guide ? (
          <div className="col-12">
            <Link href="/organizer-details">
              <div className="guide-card">
                <div style={{height: "365px"}} className="guide-thumb">
                  <img
                  style={{height: "100%", objectFit: "cover"}}
                    src={guide.profilePhoto ?? "/assets/images/profile-placeholder.png"}
                    alt=""
                    className="img-fluid"
                  />
                  <div className="guide-info">
                    <strong>{guide.firstName}, {guide.lastName}</strong>
                    <p>Tour Guide</p>
                    <span style={{ color: '#ED9734' }}>Click to view profile</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="circular-loader-container">
            <div className="circular-loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourGuide;
