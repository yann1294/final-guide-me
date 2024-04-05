import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo2 from '../../../public/assets/images/d-92.png';
import Payment2 from '../../../public/assets/images/payment/payment-card-2.png';
import Payment1 from '../../../public/assets/images/payment/payment-card-1.png';
import Payment4 from '../../../public/assets/images/payment/payment-card-4.png';

const Footer: React.FC = () => {
  return (
    <div className="footer-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <div className="footer-info">
              <div className="footer-logo">
                <Image src={Logo2} alt="footer logo" className="img-fluid" width={200} height={200} />
              </div>
              <div className="footer-social-icons">
                <h5>Follow Us:</h5>
                <ul>
                  <li>
                    <a href="#">
                      <i className="bx bxl-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bx bxl-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bx bxl-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-7">
                <div className="footer-links">
                  <h5 className="widget-title">Contact us</h5>
                  <div className="contact-box">
                    <span>
                      <i className="bx bx-phone" />
                    </span>
                    <div>
                      <a href="tel:(+1) 833-250-4843">(+1) 4049660715</a>
                    </div>
                  </div>
                  <div className="contact-box">
                    <span>
                      <i className="bx bx-mail-send" />
                    </span>
                    <div>
                      <a href="#">staff@guidemeapp.net</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-5">
                <div className="footer-links">
                  <h5 className="widget-title">support</h5>
                  <div className="category-list">
                    <ul>
                      <li>
                        <Link href="/contact">Contact us</Link>
                      </li>
                      <li>
                        <Link href="/about">About us</Link>
                      </li>
                      <li>
                        <Link href="/faq">FAQs</Link>
                      </li>
                      <li>
                        <Link href="/tc">Terms and conditions</Link>
                      </li>
                      <li>
                        <Link href="/privacy">Privacy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="footer-links payment-links">
                  <h5 className="widget-title">We Accepts:</h5>
                  <div className="payment-cards">
                    <Image src={Payment2} alt="" className="img-fluid" />
                    <Image src={Payment1} alt="" className="img-fluid" />
                    <Image src={Payment4} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="copyrigth-area">
              <p>
                Copyright 2022 <a href="#">GuideMe</a> | Built By{' '}
                <Link href="https://unlimitedwebworks.com">Unlimitedwebworks</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
