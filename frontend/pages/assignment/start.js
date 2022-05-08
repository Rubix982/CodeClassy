import AssignmentAttempt from "@components/AssignmentPages/AssignmentAttempt";
import Head from "next/head";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

export default function Create() {
  return (
    <>
      <Head>
        <title>Assignment Coding!</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <AssignmentAttempt/>
      </EnsureAuthenticated>
    </>
  );
}
