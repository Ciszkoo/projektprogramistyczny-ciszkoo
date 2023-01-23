import React from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/userReducer";
import PostForm from "./PostForm";
import PostsList from "./PostsList";

const UserTimeline = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      {user.friendship === "me" && <PostForm />}
      <PostsList />
    </>
  );
};

export default UserTimeline;
