"use client"
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import TourContent from "@/components/tours/TourContent";
import TourTab from "@/components/tours/TourTab";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

interface TourData {
    id: number;
    title: string;
    attributes: {
      desc: string;
      image?: {
        data?: {
          attributes?  : {
            url: string;
          };
        };
      };
      duration: number;
      type: string;
      groupSize: number;
      languages: string;
      // Add other attributes as needed
    };
    reviews: number;
    // Add other properties as needed
  }
  

export default function TourDetails() {
  const [data, setData] = useState<TourData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stripeSession, setStripeSession] = useState<string | null>(null);

  const makeRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    },
  });

  const stripePromise = loadStripe("process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY");

  const handlePayment = async () => {
    try {
      // Dummy data for Stripe session
      const dummyStripeSession = "dummy-stripe-session-id";
      setStripeSession(dummyStripeSession);

      // Dummy data for successful payment
      console.log("Payment successful!");
    } catch (error:any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dummy data for tour
        const dummyData: TourData = {
            id: 1,
            title: "Sample Tour",
            attributes: {
              desc: "Sample description",
              image: {
                data: {
                  attributes: {
                    url: "/bassamBeach.jpg"
                  }
                }
              },
              duration: 3,
              type: "Sample Type",
              groupSize: 10,
              languages: "English"
            },
            reviews: 5
          };
        setData(dummyData);
        setLoading(false);
      } catch (error:any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Tour Details" pageTitle="Tour Details" />
      <div className="package-details-wrapper pt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="package-details">
                {data && <TourContent data={data} />}
                {data && <TourTab data={data} />}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="package-d-sidebar">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-form">
                      <h5 className="package-d-head">Book This Tour</h5>
                      <div className="col-lg-12">
                        <input
                          type="submit"
                          value="Book Now"
                          onClick={handlePayment}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
