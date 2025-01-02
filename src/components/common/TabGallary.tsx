import React, { useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

export default function TabGallary() {
  
    const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });
  return (
    <div className="tab-contant-3">
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <div className="package-grid-one">
            <div className="single-grid">
              <a className="g-img-sm-1 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 0 })}>
                <img src="/assets/images/gallary/gl-1.png" alt="" />
              </a>
              <a className="g-img-sm-2 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 1 })}>
                <img src="/assets/images/gallary/gl-2.png" alt="" />
              </a>
              <a className="g-img-md main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 2 })}>
                <img src="/assets/images/gallary/g-xxl-1.png" alt="" />
              </a>
            </div>
            <div className="single-grid mt-24">
              <a className="g-img-sm-1 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 3 })}>
                <img src="/assets/images/gallary/gl-3.png" alt="" />
              </a>
              <a className="g-img-sm-2 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 4 })}>
                <img src="/assets/images/gallary/gl-4.png" alt="" />
              </a>
              <a className="g-img-md main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 5 })}>
                <img src="/assets/images/gallary/g-xxl-2.png" alt="" />
              </a>
            </div>
            <div className="single-grid mt-24">
              <a className="g-img-sm-1 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 6 })}>
                <img src="/assets/images/gallary/gl-5.png" alt="" />
              </a>
              <a className="g-img-sm-2 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 7 })}>
                <img src="/assets/images/gallary/gl-6.png" alt="" />
              </a>
              <a className="g-img-md main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 8 })}>
                <img src="/assets/images/gallary/g-xxl-3.png" alt="" />
              </a>
            </div>
            <div className="single-grid mt-24">
              <a className="g-img-sm-1 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 9 })}>
                <img src="/assets/images/gallary/gl-17.png" alt="" />
              </a>
              <a className="g-img-sm-2 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 10 })}>
                <img src="/assets/images/gallary/gl-16.png" alt="" />
              </a>
              <a className="g-img-md main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 11 })}>
                <img src="/assets/images/gallary/g-xxl-4.png" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="package-grid-two">
            <div className="single-grid-2">
              <a className="main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 12 })}>
                <img src="/assets/images/gallary/g-xl-1.png" alt="" />
              </a>
            </div>
            <div className="single-grid-2 mt-24">
              <a className="single-grid-2 main-gallary mt-30" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 13 })}>
                <img src="/assets/images/gallary/g-xl-2.png" alt="" />
              </a>
            </div>
            <div className="single-grid-2 mt-24">
              <a className="main-gallary mt-30" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 14 })}>
                <img src="/assets/images/gallary/g-xl-3.png" alt="" />
              </a>
            </div>
            <div className="single-grid-2 mt-24">
              <a className="main-gallary mt-30" style={{ cursor: "pointer" }} onClick={() => setOpenimg({ openingState: true, openingIndex: 15 })}>
                <img src="/assets/images/gallary/g-xl-4.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        className="img-fluid"
        open={isOpenimg.openingState}
        plugins={[Fullscreen]}
        index={isOpenimg.openingIndex}
        close={() => setOpenimg({ openingState: false, openingIndex: 0 })}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, .9)",
            cursor: "pointer",
          },
        }}
        slides={[
          // gird1
          { src: "/assets/images/gallary/gl-1-full.png" },
          { src: "/assets/images/gallary/gl-2-full.png" },
          { src: "/assets/images/gallary/g-xxl-1-full.png" },
          // gird2
          { src: "/assets/images/gallary/gl-3-full.png" },
          { src: "/assets/images/gallary/gl-4-full.png" },
          { src: "/assets/images/gallary/g-xxl-2-full.png" },
          // gird3
          { src: "/assets/images/gallary/gl-5-full.png" },
          { src: "/assets/images/gallary/gl-6-full.png" },
          { src: "/assets/images/gallary/g-xxl-3-full.png" },
          // gird4
          { src: "/assets/images/gallary/gl-17-full.png" },
          { src: "/assets/images/gallary/gl-16-full.png" },
          { src: "/assets/images/gallary/g-xxl-4-full.png" },
          // second row
          // gird5
          { src: "/assets/images/gallary/g-xl-1-full.png" },
          { src: "/assets/images/gallary/g-xl-2-full.png" },
          { src: "/assets/images/gallary/g-xl-3-full.png" },
          { src: "/assets/images/gallary/g-xl-4-full.png" },


        ]}
      />
    </div>
  )
}
