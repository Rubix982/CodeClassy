// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Component imports
import Question from "@components/Question/Question";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

const QuestionPage = () => {
  return (
    <>
      <Head>
        <title>Question</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <Question tabIndex={0}/>
      </EnsureAuthenticated>
    </>
  );
};

export default QuestionPage;
