// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Component imports
import MainContent from "@components/Index/MainContent";
import ForwardAuthenticated from "@components/Auth/forward-authenticated";

const Index = () => {
  return (
    <>
      <Head>
        <title>Index Page</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <ForwardAuthenticated>
        <MainContent />
      </ForwardAuthenticated>
    </>
  );
};

export default Index;