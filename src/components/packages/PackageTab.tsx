import React from 'react';
import { useRouter } from 'next/navigation';

interface PackagePlan {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

interface Package {
  id: number;
  attributes: {
    title: string;
    overview: string;
    package_plans: {
      data: PackagePlan[];
    };
  };
}

interface Props {
  data: Package | Package[] | null;
}

const PackageTab: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  const renderPackage = (packages: Package) => {
    //const { id } = router.query;

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
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <i className="flaticon-clipboard" />
                Travel Plan
              </button>
            </li>
          </ul>
          <div className="tab-content p-tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content-1">
                    <div className="p-overview">
                      <h5>Overview</h5>
                      <p>{packages.attributes.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <div className="tab-content-2">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-timeline-overview">
                      <h5>Overview</h5>
                      <p>{packages.attributes.overview}</p>
                    </div>
                    <ul className="p-timeline">
                      {packages.attributes.package_plans.data.map((plan) => (
                        <li key={plan.id}>
                          <div className="timeline-index">
                            <div className="index-circle">
                              <h5>01</h5>
                            </div>
                          </div>
                          <div className="timeline-content">
                            <h5>{plan.attributes.title}</h5>
                            <p>{plan.attributes.description}</p>
                            <ul>
                              <li>
                                <i className="bx bx-check" />
                                Specilaized Bilingual Guide
                              </li>
                              <li>
                                <i className="bx bx-check" />
                                Private Transport
                              </li>
                              <li>
                                <i className="bx bx-check" />
                                Entrance Fees
                              </li>
                              <li>
                                <i className="bx bx-check" />
                                Box Lunch, Water, Dinner, and Snacks
                              </li>
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (!data) {
    return <div>Package not found</div>;
  }

  if (Array.isArray(data)) {
    return data.map((packages) => renderPackage(packages));
  } else {
    return renderPackage(data);
  }
};

export default PackageTab;
