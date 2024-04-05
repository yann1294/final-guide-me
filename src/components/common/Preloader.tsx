import Head from 'next/head';
import React from 'react';

const Preloader: React.FC = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="/assets/images/favicon.png" />
      </Head>
      <div className="preloader">
        <div className="loader loader1">
          {[...Array(20)].map((_, index) => (
            <span key={index}></span>
          ))}
          <div className="rocket"></div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
