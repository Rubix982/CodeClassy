import QuizView from "@components/QuizPages/QuizView";
import Head from "next/head";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

export default function Quiz() {
  return (
    <>
      <Head>
        <title>Quiz</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <QuizView />
      </EnsureAuthenticated>
    </>
  );
}
