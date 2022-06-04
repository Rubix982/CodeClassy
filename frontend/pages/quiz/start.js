import QuizStart from "@components/QuizPages/QuizStart";
import Head from "next/head";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

export default function Attempt() {
  return (
    <>
      <Head>
        <title>Quiz Start</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <QuizStart/>
      </EnsureAuthenticated>
    </>
  );
}
