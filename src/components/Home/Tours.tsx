import Link from "next/link";
import React from "react";
import packageData from "../../data/package_grid.json";
export default function Tour({ context = "home" }) {
  return (
    <div className="package-area" style={{ paddingTop: context === "home" ? "120px" : "50px" }}>
      <div className="container">
        <div className="row">
          {context === "home" &&
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-head pb-45">
                <h5>Choose Your Tour</h5>
                <h2>Select Your best Tour For Your Travel</h2>
              </div>
            </div>
          }
          {context.includes("details") && <div className="text-start" style={{ paddingBottom: "20px" }}>
            <h3><b>Related {context.split("-")[0]}s</b></h3>
          </div>}
        </div>
        <div className="row g-4">
          {packageData.slice(0, 6).map((data) => {
            const { id, image, price, time, title, rating } = data;
            return (
              <div
                key={id}
                className="col-lg-4 col-md-6 col-sm-6 wow fadeInUp animated"
                data-wow-duration="1500ms"
                data-wow-delay="0ms"
              >
                <div className="package-card">
                  <div className="package-thumb">
                    <img src={image} alt="" className="img-fluid" />
                  </div>
                  <div className="package-details">
                    <div className="package-info">
                      <h5>
                        <span>${price}</span>/Per Person
                      </h5>
                      <h5>
                        <i className="flaticon-calendar" />
                        {time}
                      </h5>
                    </div>
                    <h3>
                      <i className="flaticon-arrival" />
                      <Link href="/package-details">
                        &nbsp;{title}
                      </Link>
                    </h3>
                    <div className="package-rating">
                      <strong>
                        <i className="bx bxs-star" />
                        <span>&nbsp;{rating}+&nbsp;</span>Rating
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
