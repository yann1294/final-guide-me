import React from 'react';

const FaqSection: React.FC = () => {
  return (
    <div className="faq-wrapper pt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="faq-wrap">
              <div className="accordion-box">
                <h5>General Question</h5>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        How old do I need to be to book a reservation?{' '}
                        <i className="bx bx-chevron-down" />
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Customers need to be 18+ and have a valid ID to book a reservation.
                      </div>
                    </div>
                  </div>
                  {/* Other accordion items */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <form>
              <div className="ask-inputs">
                <h5>Ask Any Question</h5>
                <input type="text" placeholder="Your Full Name" />
                <input type="email" placeholder="Your Email" />
                <input type="text" placeholder="Phone" />
                <textarea
                  cols={30}
                  rows={7}
                  placeholder="Message"
                  defaultValue={''}
                />
                <input type="submit" value="Ask Question" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
