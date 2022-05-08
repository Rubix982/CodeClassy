import AssignmentCreation from "@components/AssignmentPages/AssignmentCreation";
import Head from "next/head";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

export default function Create() {
  return (
    <>
      <Head>
        <title>Assignment Creation</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <AssignmentCreation/>
      </EnsureAuthenticated>
    </>
  );
}
