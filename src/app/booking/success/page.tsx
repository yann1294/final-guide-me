import React from "react";
export default function BookingSuccess() {
  return (
      <div className="container booking-success-container">
        <img className="success-icon" src="/assets/images/success.svg"/>
        <h1>Booking Completed Successfully!</h1>
        <p>Thank you for your booking. We have sent a confirmation email with all the details.</p>
        <div className="btn-container">
        <a href="/tours" className="btn">Book Another Tour</a>
        <a href="/" className="btn">Return to Home</a>
        </div>
      </div>
  );
}