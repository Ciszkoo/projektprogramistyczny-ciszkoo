import React from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectFriendsPosts } from "../../reducers/userPostsReducer";
import Post from "../Post/Post";

const Dashboard = () => {
  const posts = useAppSelector(selectFriendsPosts);

  return (
    <>
      <ul>
        {posts.map((post) => {
          return <Post key={post.postId} post={post} />;
        })}
      </ul>
    </>
  );
};

export default Dashboard;
