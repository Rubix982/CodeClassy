import Head from "next/head";
import HomePage from "@components/TeacherHomePage/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Classes</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
