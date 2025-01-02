import React from 'react'
import TabGallary from './TabGallary'
import destinationCardData from "../../data/destination_card.json";
import Link from 'next/link';

export default function TourPackageTab() {
  return (
    <>
      <div className="package-tab">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><i className="flaticon-info" />
              Information</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-activities-tab" data-bs-toggle="pill" data-bs-target="#pills-activities" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><i className="flaticon-clipboard" />
              Tour activities</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-tours-tab" data-bs-toggle="pill" data-bs-target="#pills-tours" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"> <i className="flaticon-gallery" />
              Tours</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-photos-tab" data-bs-toggle="pill" data-bs-target="#pills-photos" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"> <i className="flaticon-gallery" />
              Tour photos</button>
          </li>
        </ul>
        <div className="tab-content p-tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div className="row">
              {/* Description */}
              <div className="col-lg-12">
                <div className="tab-content-1">
                  <div className="p-overview">
                    <h5>Tour description</h5>
                    <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla. Duis aliquet varius mauris eget rutrum. Nullam sit amet justo consequat, bibendum orci in, convallis enim. Proin convallis neque viverra finibus cursus. Mauris lacinia lacinia erat in finibus. In non enim libero.Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pills-activities" role="tabpanel" aria-labelledby="pills-activities-tab">
            <div className="tab-content-2">
              <div className="row">
                <div className="col-lg-12">

                  <ul className="p-timeline">
                    <li>
                      <div className="timeline-index">
                        <div className="index-circle">
                          <h5>01</h5>
                        </div>
                      </div>
                      <div className="timeline-content">
                        <h5>Activity 1 : Departure And Small Tour</h5>
                        <strong>10.00 AM to 10.00 PM</strong>
                        <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                        <ul>
                          <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                          <li /><li><i className="bx bx-check" />Private Transport</li>
                          <li /><li><i className="bx bx-check" />Entrance Fees</li>
                          <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-index">
                        <div className="index-circle">
                          <h5>02</h5>
                        </div>
                      </div>
                      <div className="timeline-content">
                        <h5>DAY 2 : Departure And Small Tour</h5>
                        <strong>10.00 AM to 10.00 PM</strong>
                        <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                        <ul>
                          <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                          <li /><li><i className="bx bx-check" />Private Transport</li>
                          <li /><li><i className="bx bx-check" />Entrance Fees</li>
                          <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-index">
                        <div className="index-circle">
                          <h5>03</h5>
                        </div>
                      </div>
                      <div className="timeline-content">
                        <h5>DAY 3 : Departure And Small Tour</h5>
                        <strong>10.00 AM to 10.00 PM</strong>
                        <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                        <ul>
                          <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                          <li /><li><i className="bx bx-check" />Private Transport</li>
                          <li /><li><i className="bx bx-check" />Entrance Fees</li>
                          <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-index">
                        <div className="index-circle">
                          <h5>04</h5>
                        </div>
                      </div>
                      <div className="timeline-content">
                        <h5>DAY 4 : Departure And Small Tour</h5>
                        <strong>10.00 AM to 10.00 PM</strong>
                        <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                        <ul>
                          <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                          <li /><li><i className="bx bx-check" />Private Transport</li>
                          <li /><li><i className="bx bx-check" />Entrance Fees</li>
                          <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-index">
                        <div className="index-circle">
                          <h5>05</h5>
                        </div>
                      </div>
                      <div className="timeline-content">
                        <h5>DAY 5 : Departure And Small Tour</h5>
                        <strong>10.00 AM to 10.00 PM</strong>
                        <p>Pellentesque accumsan magna in augue sagittis, non fringilla eros molestie. Sed feugiat mi nec ex vehicula, nec vestibulum orci semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec tristique commodo fringilla.</p>
                        <ul>
                          <li /><li><i className="bx bx-check" />Specilaized Bilingual Guide</li>
                          <li /><li><i className="bx bx-check" />Private Transport</li>
                          <li /><li><i className="bx bx-check" />Entrance Fees</li>
                          <li /><li><i className="bx bx-check" />Box Lunch,Water,Dinner and Snacks</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pills-tours" role="tabpanel" aria-labelledby="pills-tours-tab">
            <div className="tab-content-2">
            <div className="row">
                  {destinationCardData.slice(0, 4).map((data) => {
                    const { id, image, title, rating, price } = data;
                    return (
                      <div key={id} className="col-lg-4 col-md-6 col-sm-6 wow fadeInUp animated">
                        <div className="package-card">
                          <div className="package-thumb">
                            <img src={image} alt="" className="img-fluid" />
                          </div>
                          <div className="package-details">
                            <div className="package-info">
                              <h5>
                                <span>${price}</span>/Per Person
                              </h5>
                            </div>
                            <h3>
                              <i className="flaticon-arrival" />
                              <Link href="/package-details">&nbsp;{title}</Link>
                            </h3>
                            <div className="package-rating">
                              <i className="bx bxs-star" />
                              <strong>
                                <span>{rating}</span> Rating
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
          <div className="tab-pane fade" id="pills-photos" role="tabpanel" aria-labelledby="pills-photos-tab">
            <TabGallary />
          </div>
        </div>
      </div>
    </>
  )
}
