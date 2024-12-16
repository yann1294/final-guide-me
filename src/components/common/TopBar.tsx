import React from 'react';

const Topbar: React.FC = () => {
  return (
    <div className="topbar-area bg-green-500 p-0">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="topbar-contact">
            {/* Content here */}
          </div>
          <div className="topbar-social">
            <ul className="flex">
              <li className="mx-3">
                <a href="#">
                  <i className="bx bxl-instagram text-orange-500" />
                </a>
              </li>
              <li className="mx-3">
                <a href="#">
                  <i className="bx bxl-facebook text-orange-500" />
                </a>
              </li>
              <li className="mx-3">
                <a href="#">
                  <i className="bx bxl-twitter text-orange-500" />
                </a>
              </li>
              <li className="mx-3">
                <a href="#">
                  <i className="bx bxl-whatsapp text-orange-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
