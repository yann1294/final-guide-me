import React from 'react';
import Image from 'next/image';

interface TourData {
    id: number;
    title: string;
    attributes: {
      desc: string;
      image?: {
        data?: {
          attributes?: {
            url: string;
          };
        };
      };
      duration: number;
      type: string;
      groupSize: number;
      languages: string;
      // Add other attributes as needed
    };
    reviews: number;
    // Add other properties as needed
  }
  
  

interface Props {
  data: TourData | null;
}

const TourContent: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <div>Tour not found</div>;
  }

  return (
    <>
      <div className="package-thumb">
        <Image
          src={data?.attributes?.image?.data?.attributes?.url || "/bassamBeach.jpg"}
          alt={data.title}
          width={250}
          height={250}
        />
      </div>
      <div className="package-header">
        <div className="package-title">
          <h3>{data.title}</h3>
        </div>
        <div className="pd-review">
          <p>Excellent</p>
          <ul>
            {[...Array(4)].map((_, index) => (
              <li key={index}>
                <i className="bx bxs-star" />
              </li>
            ))}
            <li>
              <i className="bx bx-star" />
            </li>
          </ul>
          <p>{data.reviews} Review</p>
        </div>
      </div>
      <div className="p-short-info">
        <div className="single-info">
          <i className="flaticon-clock" />
          <div className="info-texts">
            <strong>Duration</strong>
            <p>{data.attributes.duration}hrs</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-footprints" />
          <div className="info-texts">
            <strong>Tour Type</strong>
            <p>{data.attributes.type}</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-traveller" />
          <div className="info-texts">
            <strong>Group Size</strong>
            <p>{data.attributes.groupSize} People</p>
          </div>
        </div>
        <div className="single-info">
          <i className="flaticon-translate" />
          <div className="info-texts">
            <strong>Languages</strong>
            <p>{data.attributes.languages}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourContent;
