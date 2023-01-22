import React from "react";
import { useParams } from "react-router";
import FriendsSubPage from "../components/Friends/FriendsSubPage";
// import { useUser } from "./UserRoute";

const FriendsRoute = () => {
  // const { isMe } = useUser();

  const {id} = useParams();

  return (
    <>
      <FriendsSubPage />
    </>
  );
};

export default FriendsRoute;
