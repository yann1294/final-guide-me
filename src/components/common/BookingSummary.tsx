// components/tours/TourSummary.tsx

import { PaymentDTO } from '@/dto/payment.dto';
import { ContextType } from '@/lib/utils/context.utils';
import React from 'react';

const BookingSummary = ({
  tour,
  numberOfPeople,
  setNumberOfPeople,
  tax,
  createStripeOrder,
  user,
  context,
}: any) => {
  return (
    <div className="col-lg-12 col-md-6">
      <div className="p-sidebar-form">
        <h5 className="package-d-head">Book This {context === ContextType.tour ? "Tour" : "Package"}</h5>
        <hr />
        <div className="row">
          <div className="col-lg-12 order-summary">
            <div className="field">Type</div>
            <div className="value">{context === ContextType.tour ? "Tour" : "Package"}</div>
          </div>
          <div className="col-lg-12 order-summary">
            <div className="field">Price</div>
            <div className="value">{tour.price}</div>
          </div>
          <div className="col-lg-12 order-summary">
            <div className="field">Discount ({tour.discount}%)</div>
            <div className="value">
              ${tour.price - tour.price * (tour.discount / 100)}
            </div>
          </div>
          <div className="col-lg-12 order-summary">
            <div className="field">People</div>
            <div className="value">
              {numberOfPeople.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="col-lg-12 order-summary">
            <div className="field">Tax</div>
            <div className="value">${tax}</div>
          </div>
          <div className="col-lg-12 order-summary">
            <div className="field">Total Price</div>
            <div className="value">
              $
              {numberOfPeople *
                (tour.price + tax - tour.price * (tour.discount / 100))}
            </div>
          </div>
          <div className="col-lg-12 select-participants">
            <label htmlFor="">Select number of participants</label>
            <input
              className="form-select mt-1"
              aria-label="Select number of participants"
              onChange={(e) => {
                if (e.target.value) {
                  setNumberOfPeople(parseInt(e.target.value));
                } else {
                  setNumberOfPeople(1);
                }
              }}
              value={numberOfPeople}
              min={1}
              type="number"
            />
          </div>
          <hr />
          <div className="col-lg-12">
            <input
              onClick={async () => {
                await createStripeOrder({
                  gateway: 'stripe',
                  amount:
                    numberOfPeople *
                    (tour.price + tax - tour.price * (tour.discount / 100)),
                  currency: 'USD',
                  userId: user?.uid,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                } as PaymentDTO);
              }}
              type="submit"
              value="Pay with stripe"
            />
          </div>
          <div className="col-lg-12">
            <input type="submit" value="Pay with Paypal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
