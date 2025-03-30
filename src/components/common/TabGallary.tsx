import React, { useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

export default function TabGallery({ images }: { images: string[]}) {
  
    const [isOpenimg, setOpening] = useState({
    openingState: false,
    openingIndex: 0,
  });
  return (
    <div className="tab-contant-3">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="package-grid-one">
            <div className="single-grid mt-24">
              <a className="g-img-sm-1 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpening({ openingState: true, openingIndex: 0 })}>
                <img src="/assets/images/gallary/gl-3.png" alt="" />
              </a>
              <a className="g-img-sm-2 main-gallary" style={{ cursor: "pointer" }} onClick={() => setOpening({ openingState: true, openingIndex: 1 })}>
                <img src="/assets/images/gallary/gl-4.png" alt="" />
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
        close={() => setOpening({ openingState: false, openingIndex: 0 })}
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
