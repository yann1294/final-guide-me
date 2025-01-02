import { TourDTO } from '@/dto/tour.dto';
import useTourStore from '@/stores/tourStore';
import { ImagesIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import { PackageDTO } from '@/dto/package.dto';

export default function TourPackageContent({ tour, context }: { tour?: TourDTO | PackageDTO, context: "packages" | "tours" }) {
  const [isOpening, setOpening] = useState({
    openingState: false,
    openingIndex: 0,
  });

  return (
    <>
      <div className="package-thumb">
        <img src={tour?.images ? tour?.images[0] : ""} alt="" />
      </div>
      <div className="package-header">
        <div className="package-title">
          <h3>{tour?.name}</h3>
          <strong>
            <i className="flaticon-arrival" />
            &nbsp;
            {tour?.location.name}, {tour?.location.city}, {tour?.location.country}
          </strong>
        </div>
        <div
          title="Click to view tour photos"
          onClick={() => setOpening({ openingState: true, openingIndex: 0 })}
          className="pd-review flex justify-between flex-col"
          style={{ alignItems: 'end' }}
        >
          <div>
            <p>Click to view tour photos</p>
          </div>
          <div>
            <ImagesIcon color="#ED9734" size={40} />
          </div>
        </div>
      </div>
      <div className="p-short-info">
        <div className="single-info">
          <i className="flaticon-clock" />
          <div className="info-texts">
            <strong>Duration</strong>
            <p>
              {tour?.durationDays} {tour?.durationDays === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-footprints" />
          <div className="info-texts">
            <strong>Type</strong>
            <p>{context === "tours" ? "Tour" : "Package"}</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-traveller" />
          <div className="info-texts">
            <strong>Seats</strong>
            <p>
              {tour?.numberOfSeats} {tour?.numberOfSeats === 1 ? 'seat' : 'seats'}
            </p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-translate" />
          <div className="info-texts">
            <strong>Languages</strong>
            <p>Any Language</p>
          </div>
        </div>
      </div>
      <Lightbox
        className="img-fluid"
        open={isOpening.openingState}
        plugins={[Fullscreen]}
        index={isOpening.openingIndex}
        close={() => setOpening({ openingState: false, openingIndex: 0 })}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, .9)',
            cursor: 'pointer',
          },
        }}
        slides={
          tour?.images
            ? tour?.images.map(
                (image) =>
                  ({
                    src: image,
                  } as SlideImage),
              )
            : undefined
        }
      />
    </>
  );
}
