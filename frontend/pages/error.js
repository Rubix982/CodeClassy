// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Component imports
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";
import ErrorPage from "@components/ErrorPage/ErrorPage";

const Error = ({ errorMessage }) => {
  return (
    <>
      <Head>
        <title>Error</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <ErrorPage errorMessage={errorMessage} />
      </EnsureAuthenticated>
    </>
  );
};

export default Error;
