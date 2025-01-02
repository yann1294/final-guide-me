"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/stores/globalStore";
import useTourStore from "@/stores/tourStore";
import { useFetchTours } from "@/hooks/useTours";
import packageCardData from "../../data/package_grid.json";

const TourList = () => {
  // const router = useRouter();
  // const { tours } = useTourStore();
  // const { fetchTours } = useFetchTours();

  // useEffect(() => {
  //   if (tours.length === 0) {
  //     fetchTours();
  //   }
  // }, []);

  // if (!tours) return null; // Suspense handles the loading skeleton

  // const handleClick = (id: string) => {
  //   router.push(`/tours/${id}`);
  // };

  return (
    <div className="container">
    <div className="row g-4" >
            {packageCardData.map((data) => {
              const { id, image, rating, price, title, time }:any = data;
              return (
                <div key={id} className="col-lg-4 col-md-6 col-sm-6">
                  <div className="package-card">
                    <div className="package-thumb">
                      <img src={image} alt="" className="img-fluid" />
                    </div>
                    <div className="package-details">
                      <div className="package-info">
                        <h5>
                          <span className="text-danger">${price}</span>&nbsp;&nbsp;
                          <span>${price - 56}</span>/Per Person
                        </h5>
                        <div className="duration">3 days</div>
                      </div>
                      <div className="resource-name">
                        Name of the tour
                      </div>
                      <div className="resource-location">
                        <i className="flaticon-arrival" />
                        <Link href="/package-details">&nbsp;{title}</Link>
                      </div>
                      <div className="card-foot d-flex justify-content-between">
                        <div className="card-chip package-availability">Available</div>
                        <div className="card-chip number-of-seats">4 seats</div>
                        <div className="card-chip date">29/09/29</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
          <div className="col-lg-12">
            <div className="pagination mt-30">
              <a href="#">
                <i className="bx bx-chevron-left" />
              </a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">
                <i className="bx bx-chevron-right" />
              </a>
            </div>
          </div>
        </div>
        </div>
  );
};

export default TourList;
