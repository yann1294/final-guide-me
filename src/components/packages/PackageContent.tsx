import React from 'react';
import Image from 'next/image';

interface Package {
  id: number;
  attributes: {
    title: string;
    location: string;
    duration: string;
    type: string;
    languages: string;
    image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

interface Props {
  data: Package | Package[] | null;
}

const PackageContent: React.FC<Props> = ({ data }) => {
  const renderPackage = (packages: Package) => {
    return (
      <div key={packages.id}>
        <div className="package-thumb">
          {packages.attributes?.image?.data?.attributes && (
            <Image
              src={
                process.env.NEXT_PUBLIC_STRAPI_UPLOAD_URL +
                packages.attributes.image.data.attributes.url
              }
              alt={packages.attributes.title}
              className="img-fluid"
              width={250}
              height={250}
            />
          )}
        </div>
        <div className="package-header">
          <div className="package-title">
            <h3>{packages.attributes?.title}</h3>
            <strong>
              <i className="flaticon-arrival" />
              &nbsp;{packages.attributes?.location}
            </strong>
          </div>
        </div>
        <div className="p-short-info">
          <div className="single-info">
            <i className="flaticon-clock" />
            <div className="info-texts">
              <strong>Duration</strong>
              <p>{packages.attributes?.duration}</p>
            </div>
          </div>
          <div className="single-info">
            <i className="flaticon-footprints" />
            <div className="info-texts">
              <strong>Package Type</strong>
              <p>{packages.attributes?.type}</p>
            </div>
          </div>
          <div className="single-info">
            <i className="flaticon-translate" />
            <div className="info-texts">
              <strong>Languages</strong>
              <p>{packages.attributes?.languages}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!data) {
    return <div>Package not found</div>;
  }

  if (Array.isArray(data)) {
    return data.map((packages) => renderPackage(packages));
  } else {
    return renderPackage(data);
  }
};

export default PackageContent;
