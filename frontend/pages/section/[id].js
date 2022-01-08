// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Components Import
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";
import SectionMainContent from "@components/Section/SectionMainContent";

function SectionPage() {
  return (
    <>
      <Head>
        <title>Section</title>
        <meta name="section page" content="Section page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EnsureAuthenticated>
        <SectionMainContent />
      </EnsureAuthenticated>
    </>
  );
}

export default SectionPage;
