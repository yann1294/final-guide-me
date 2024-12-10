import React from "react";

interface TourDTO {
  id: string;
  name: string;
  description?: string;
  activities?: Record<string, object>;
}

interface Props {
  data: TourDTO | null;
}

const TourTab: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <div>Tour not found</div>;
  }

  return (
    <>
      <div className="package-tab">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <i className="flaticon-info" />
              Information
            </button>
          </li>
        </ul>
        <div className="tab-content p-tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content-1">
                  <div className="p-overview">
                    <h5>Overview</h5>
                    <p>{data.description || "No description available."}</p>
                  </div>
                  <div className="p-details-table">
                    <table className="table caption-top">
                      <tbody>
                        <tr>
                          <td>Destination</td>
                          <td>{data.name}</td>
                        </tr>
                        <tr>
                          <td>Included</td>
                          <td>
                            <ul className="table-list-allow">
                              <li>
                                <i className="bx bx-check" /> Specialized
                                Bilingual Guide
                              </li>
                              <li>
                                <i className="bx bx-check" /> Private Transport
                              </li>
                              <li>
                                <i className="bx bx-check" /> Entrance Fees
                              </li>
                              <li>
                                <i className="bx bx-check" /> Box Lunch, Water,
                                Dinner, and Snacks
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>Excluded</td>
                          <td>
                            <ul className="table-list-disallow">
                              <li>
                                <i className="bx bx-x" /> Additional Services
                              </li>
                              <li>
                                <i className="bx bx-x" /> Insurance
                              </li>
                              <li>
                                <i className="bx bx-x" /> Drinks
                              </li>
                              <li>
                                <i className="bx bx-x" /> Tickets
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourTab;
