import AssignmentView from "@components/AssignmentPages/AssignmentView";
import Head from "next/head";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

export default function Create() {
  return (
    <>
      <Head>
        <title>Assignment View</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <AssignmentView/>
      </EnsureAuthenticated>
    </>
  );
}
