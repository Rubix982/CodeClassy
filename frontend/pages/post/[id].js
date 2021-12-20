import React from "react";
import Post from "../../src/components/Post/Post";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

const PostPage = () => {
  return (
    <EnsureAuthenticated>
      <Post />
    </EnsureAuthenticated>
  );
};

export default PostPage;
