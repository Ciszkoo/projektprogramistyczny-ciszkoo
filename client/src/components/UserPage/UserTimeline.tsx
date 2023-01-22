import React from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectUserPosts } from "../../reducers/postsReducer";
import { selectUser } from "../../reducers/userReducer";
import Card from "../Card/Card";
import PostForm from "./PostForm";
import PostsList from "./PostsList";

const UserTimeline = () => {
  const posts = useAppSelector(selectUserPosts);
  const user = useAppSelector(selectUser);

  return (
    <>
      {user.friendship === "me" && (
        <Card customClass="w-full">
          <PostForm />
        </Card>
      )}
      <PostsList posts={posts} />
    </>
  );
};

export default UserTimeline;
