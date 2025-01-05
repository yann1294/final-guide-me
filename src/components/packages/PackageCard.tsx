import "swiper/css/autoplay";
import "swiper/css/autoplay";
import { PackageDTO } from "@/dto/package.dto";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import TourCard from "../tours/TourCard";
import { packageSlideConfig } from "@/lib/config/swiperConfig";
import { ContextType } from "@/lib/utils/contextUtils";
import usePackageStore from "@/stores/packageStore";
import Link from "next/link";
import { convertSecondsToDate } from "@/lib/utils/dateUtils";

export default function PackageCard({ pkg: packageObj }: { pkg: PackageDTO }) {
  const { packages, tours } = usePackageStore(); // Accessing package and tour data from the store
  

  return (
    <div className="row wow fadeInUp animated">
      
      {/* Package Card - Left Section: Package Details */}
      <div className="col-lg-3 col-md-3">
        <Link href={`/packages/${packageObj.id}`} className="package-slider-wrap">
          
          {/* Package Image */}
          <img
            style={{ objectFit: 'cover' }}
            src={packageObj.images ? packageObj.images[0] : '/assets/images/destination/d-1.png'}
            alt=""
            className="img-fluid"
          />
          
          {/* Package Name Overlay */}
          <div className="pakage-overlay text-center">
            <strong>{packageObj.name}</strong>
          </div>
          
          {/* Slider Navigation Arrows */}
          <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
            <div className="bannerNext1 swiper-btn">
              <i className="bx bx-chevron-left"></i>
            </div>
            <div className="bannerPrev1 swiper-btn">
              <i className="bx bx-chevron-right"></i>
            </div>
          </div>

          {/* Price Details */}
          <div className="package-price-details">
            {/* Display Price with Discount (if any) */}
            {packageObj.discount !== 0 && (
              <>
                <div className="package-price">
                  <span className="text-danger crossed-line">${packageObj.price}</span>/Per Person
                </div>
                <div className="package-discounted-price">
                  <span>
                    ${packageObj.price - packageObj.price * (packageObj.discount / 100)}
                  </span>/Per Person
                </div>
              </>
            )}
            
            {/* Display Price without Discount */}
            {packageObj.discount === 0 && (
              <div className="package-price">
                <span>${packageObj.price}</span>/Per Person
              </div>
            )}
          </div>

          {/* Package Card Details */}
          <div className="package-card-details">
            {/* Availability Status */}
            {packageObj.isAvailable ? (
              <div className="card-chip package-availability">Available</div>
            ) : (
              <div className="card-chip package-availability card-chip-not-available">Not Available</div>
            )}

            {/* Seat Information */}
            <div className="card-chip number-of-seats">
              {packageObj.numberOfSeats} {packageObj.numberOfSeats === 1 ? 'seat' : 'seats'}
            </div>

            {/* Duration Information */}
            <div className="card-chip duration-in-days">
              {packageObj.durationDays} {packageObj.durationDays === 1 ? 'day' : 'days'}
            </div>

            {/* Number of Tours */}
            <div className="card-chip number-of-tours">
              {packageObj.tours.length} {packageObj.tours.length === 1 ? 'tour' : 'tours'}
            </div>

            {/* Date Information (converted seconds to date) */}
            <div className="card-chip date">
              {convertSecondsToDate(30001897)} {/* Example value */}
            </div>
          </div>
        </Link>
      </div>

      {/* Package Card - Right Section: Tour Slider */}
      <div className="col-lg-9 col-md-9">
        <div className="row destinations-1">
          
          {/* Swiper Component for Tour Carousel */}
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]} // Importing necessary swiper modules
            navigation={{
              nextEl: '.bannerPrev1', // Next button
              prevEl: '.bannerNext1', // Previous button
            }}
            autoplay={true} // Enables autoplay for the slider
            speed={1500} // Speed of the swiper transition
            {...packageSlideConfig} // Configurations for the swiper
            className="swipper"
          >
            <div className="swipper-wrapper">
              {/* Rendering Tour Cards in the Swiper */}
              {tours.get(packageObj.id as string)?.map((tour) => (
                <SwiperSlide key={tour.id}>
                  <TourCard tour={tour} origin={ContextType.package} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}