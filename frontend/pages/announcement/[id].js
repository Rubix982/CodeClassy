// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Component imports
import Announcement from "@components/Announcement/Announcement";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

const AnnouncementPage = () => {
  return (
    <>
      <Head>
        <title>Announcement</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <Announcement />
      </EnsureAuthenticated>
    </>
  );
};

export default AnnouncementPage;
