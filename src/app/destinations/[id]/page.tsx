"use client"
import React, { useState, useEffect } from "react";
import Breadcrumb from '@/components/common/Breadcrumb'
import PackageContent from "@/components/packages/PackageContent";
import PackageTab from "@/components/packages/PackageTab";
import axios from "axios";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

// Define types
interface Package {
    id: number;
    attributes: {
      title: string;
      overview: string;
      package_plans: {
        data: PackagePlan[];
      };
      // Additional properties can be added if needed
      location: string;
      duration: string;
      type: string;
      languages: string;
      image?: {
        data?: {
          attributes?: {
            url: string;
          };
        };
      };
    };
  }
  interface PackagePlan {
    id: number;
    attributes: {
      title: string;
      description: string;
    };
  }  
interface StripeSessionData {
  id: string;
}

export default function DestinationsDetails() {
  const router = useRouter();
 // const { id } = router.query;

  const [data, setData] = useState<Package | null>(null);
  const [stripeSession, setStripeSession] = useState<StripeSessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const makeRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    },
  });

  const stripePromise = loadStripe('process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY');

  const fetchData = async () => {
    try {
      // Dummy data for API call
      const dummyData: Package = {
        id: 1,
        attributes: {
          title: "Dummy overview",
          location:"Panama",
          duration:"24Hrs",
          languages:"English",
          overview:"incredible activities in panama",
          type:"adventure",
          package_plans: {
            data: [
              {
                id: 1,
                attributes: {
                  title: "Plan 1",
                  description: "Description of plan 1",
                },
              },
              {
                id: 2,
                attributes: {
                  title: "Plan 2",
                  description: "Description of plan 2",
                },
              },
              // Add more package plans as needed
            ],
          },
          // Add other properties
        },
      };
      setData(dummyData);
      setLoading(false);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const fetchStripeSession = async () => {
    try {
      // Dummy data for Stripe session
      const dummyStripeSession: StripeSessionData = {
        id: "dummy-stripe-session-id",
      };
      setStripeSession(dummyStripeSession);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      // Dummy response for package orders
      const dummyResponse = {
        data: {
          stripeSession: {
            id: "dummy-stripe-session-id",
          }
        }
      };
      setStripeSession(dummyResponse.data.stripeSession);
      await stripe!.redirectToCheckout({
        sessionId: dummyResponse.data.stripeSession.id,
      });
    } catch (error:any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStripeSession();
  }, []); // Empty dependency array for initial load only

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Package Details" pageTitle="Package Details" />
      <div className="package-details-wrapper pt-120">
        <div className="container">
          {/* Render package details */}
          <div className="row">
            <div className="col-lg-8">
              <div className="package-details">
                {data && <PackageContent data={data} />}
                {data && <PackageTab data={data} />}
              </div>
            </div>
            {/* Render booking form */}
            <div className="col-lg-4">
              <div className="package-d-sidebar">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-form">
                      <h5 className="package-d-head">Book This Package</h5>
                      <div className="col-lg-12">
                        <input type="submit" value="Book Now" onClick={handlePayment} />
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
