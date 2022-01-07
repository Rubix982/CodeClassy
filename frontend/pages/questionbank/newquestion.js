// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Component imports
import AddNewQuestion from "@components/AddNewQuestion/AddNewQuestion";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

const NewQuestion = () => {
  return (
    <>
      <Head>
        <title>Question Bank</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <AddNewQuestion />
      </EnsureAuthenticated>
    </>
  );
};

export default NewQuestion;
