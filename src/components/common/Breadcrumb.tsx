import React from "react";
import Link from "next/link";
export default function Breadcumb({ pageTitle, pageName }:any) {
  return (
    <div className="breadcrumb-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="breadcrumb-wrap">
              <h2>{pageTitle}</h2>
              <ul className="breadcrumb-links">
                <li>
                  <Link href="/">
                    Home
                  </Link>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>{pageName}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
