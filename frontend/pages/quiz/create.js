import QuizCreation from "@components/QuizPages/QuizCreation";
import Head from "next/head";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

export default function Create() {
  return (
    <>
      <Head>
        <title>Quiz Creation</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <QuizCreation/>
      </EnsureAuthenticated>
    </>
  );
}
