import Head from 'next/head';
import React from 'react';

const Loading = () => {
  return (
    <>
      <Head>Loading..</Head>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loading;
