import React from "react";
import { LoadingCard } from "../components/Card/Card";
import UserPage from "../components/UserPage/UserPage";
import { useAppSelector } from "../reducers/hooks";
import { selectUserFetchStatus } from "../reducers/userReducer";

const UserRoute = () => {
  const status = useAppSelector(selectUserFetchStatus);

  return status === "idle" ? <UserPage /> : <LoadingCard />;
};

export default UserRoute;
