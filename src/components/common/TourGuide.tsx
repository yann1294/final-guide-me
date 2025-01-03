// components/tours/TourGuide.tsx

import React from 'react';

const TourGuide = () => {
  return (
    <div className="col-lg-12 col-md-6">
      <div className="p-sidebar-organizer mt-40">
        <h5 className="package-d-head">Guide By</h5>
        <div className="col-12">
          <a href="/organizer-details">
            <div className="guide-card">
              <div className="guide-thumb">
                <img
                  src={'/assets/images/guide/guide-2.png'}
                  alt=""
                  className="img-fluid"
                />
                <div className="guide-info">
                  <strong>{'John Doe'}</strong>
                  <p>Tour Guide</p>
                  <a style={{ color: '#ED9734' }}>Click to view profile</a>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TourGuide;
