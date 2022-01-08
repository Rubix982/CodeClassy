// React imports
import React from "react";

// NextJS imports
import Head from "next/head";

// Component imports
import Post from "@components/Post/Post";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

const PostPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <EnsureAuthenticated>
        <Post />
      </EnsureAuthenticated>
    </>
  );
};

export default PostPage;
