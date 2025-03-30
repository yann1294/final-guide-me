import { TourDTO } from '@/dto/tour.dto';
import { PackageDTO } from '@/dto/package.dto';
import { ImagesIcon } from 'lucide-react';
import React, { useState } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import { CONTEXT, ContextType } from '@/lib/utils/contextUtils';

interface TourPackageContentProps {
  resource: TourDTO | PackageDTO;
  context: CONTEXT;
}

export default function TourPackageContent({ resource, context }: TourPackageContentProps) {
  const [isOpening, setOpening] = useState({
    openingState: false,
    openingIndex: 0,
  });

  if (!resource) return null;

  // Render based on context: "packages" or "tours"
  return (
    <>
      <div className="package-thumb">
        <img src={resource.images ? resource.images[0] : ""} alt="" />
      </div>
      <div className="package-header">
        <div className="package-title">
          <h3>{resource.name}</h3>
          <strong>
            <i className="flaticon-arrival" />
            &nbsp;
            {resource.location?.name}, {resource.location?.city}, {resource.location?.country}
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
              {resource.durationDays} {resource.durationDays === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-footprints" />
          <div className="info-texts">
            <strong>Type</strong>
            <p>{context === ContextType.tour ? "Tour" : "Package"}</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-traveller" />
          <div className="info-texts">
            <strong>Seats</strong>
            <p>
              {resource.numberOfSeats} {resource.numberOfSeats === 1 ? 'seat' : 'seats'}
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
          resource.images
            ? resource.images.map(
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
