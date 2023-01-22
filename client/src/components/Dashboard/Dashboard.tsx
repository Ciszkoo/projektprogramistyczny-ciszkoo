import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchFriendsPosts, selectFriendsPosts } from "../../reducers/postsReducer";
import Post from "../Post/Post";

const Dashboard = () => {
  const posts = useAppSelector(selectFriendsPosts);

  const isThereAnyPosts = posts.length > 0;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFriendsPosts(0))
  }, [])

  return (
    <ul>
      {!isThereAnyPosts && (
        <p className="text-2xl">
          Twoi znajomi albo są nudni albo ich nie masz. Przykro nam.
        </p>
      )}
      {posts.map((post) => {
        return <Post key={post.postId} post={post} whose="all" />;
      })}
    </ul>
  );
};

export default Dashboard;
