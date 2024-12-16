import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo2 from "../../../public/assets/images/d-92.png";
import Payment2 from "../../../public/assets/images/payment/payment-card-2.png";
import Payment1 from "../../../public/assets/images/payment/payment-card-1.png";
import Payment4 from "../../../public/assets/images/payment/payment-card-4.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Footer Logo and Social Icons */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <div className="text-center lg:text-left">
              <Image
                src={Logo2}
                alt="Footer Logo"
                className="mx-auto lg:mx-0"
                width={150}
                height={150}
              />
              <div className="mt-4">
                <h5 className="text-lg font-semibold">Follow Us:</h5>
                <ul className="flex justify-center lg:justify-start space-x-4 mt-2">
                  <li>
                    <a href="#" className="hover:text-orange-500">
                      <i className="bx bxl-facebook text-2xl"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-500">
                      <i className="bx bxl-instagram text-2xl"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400">
                      <i className="bx bxl-twitter text-2xl"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="w-full lg:w-2/3 flex flex-wrap">
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-8 sm:mb-0">
              <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="bx bx-phone text-2xl"></i>
                  <a
                    href="tel:(+1) 4049660715"
                    className="hover:text-orange-500"
                  >
                    (+1) 4049660715
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="bx bx-mail-send text-2xl"></i>
                  <a
                    href="mailto:staff@guidemeapp.net"
                    className="hover:text-orange-500"
                  >
                    staff@guidemeapp.net
                  </a>
                </div>
              </div>
            </div>

            {/* Support Links */}
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-8 sm:mb-0">
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="hover:text-orange-500">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-orange-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-orange-500">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/tc" className="hover:text-orange-500">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-orange-500">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="w-full lg:w-1/3">
              <h5 className="text-lg font-semibold mb-4">We Accept</h5>
              <div className="flex space-x-3">
                <Image src={Payment2} alt="Payment Card" className="w-16" />
                <Image src={Payment1} alt="Payment Card" className="w-16" />
                <Image src={Payment4} alt="Payment Card" className="w-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            Copyright 2022{" "}
            <a href="#" className="hover:text-orange-500">
              GuideMe
            </a>{" "}
            | Built By{" "}
            <Link
              href="https://unlimitedwebworks.com"
              className="hover:text-orange-500"
            >
              Unlimitedwebworks
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
