// import React from "react";
import Breadcumb from "../../components/common/Breadcrumb";
import guidData from "../../data/guid_data.json";
export default function guide() {
  return (
    <div>
      <Breadcumb pageName="Tour Guide" pageTitle="Tour Guide" />
      <div className="guide-wrapper pt-120">
        <div className="container">
          <div className="row g-4">
            {guidData.map((data) => {
              const { id, image, name } = data;
              return (
                <div key={id} className="col-lg-4 col-md-6 col-sm-6">
                  <div className="guide-card">
                    <div className="guide-thumb">
                      <img src={image} alt="" className="img-fluid" />
                      <div className="guide-info">
                        <strong>{name}</strong>
                        <p>Tour Guide</p>
                        <ul className="guide-links">
                          <li>
                            <a href="#">
                              <i className="bx bxl-instagram" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="bx bxl-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="bx bxl-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="bx bxl-whatsapp" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
