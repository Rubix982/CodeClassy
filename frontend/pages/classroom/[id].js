// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Components Import
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";
import ClassroomMainContent from "@components/Classroom/ClassroomMainContent";

function ClassroomPage() {
  return (
    <>
      <Head>
        <title>Classroom</title>
        <meta name="classroom page" content="Classroom page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EnsureAuthenticated>
        <ClassroomMainContent />
      </EnsureAuthenticated>
    </>
  );
}

export default ClassroomPage;