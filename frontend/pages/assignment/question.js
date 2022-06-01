import AssignmentQuestion from "@components/AssignmentPages/AssignmentQuestion";
import Head from "next/head";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

export default function Question() {
  return (
    <>
      <Head>
        <title>Assignment Question</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <AssignmentQuestion/>
      </EnsureAuthenticated>
    </>
  );
}
