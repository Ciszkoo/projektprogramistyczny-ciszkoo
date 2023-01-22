import React from "react";
import UserPage from "../components/UserPage/UserPage";
import { useAppSelector } from "../reducers/hooks";
import { selectUserFetchStatus } from "../reducers/userReducer";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  avatar: string;
  friendship: "none" | "invited" | "invitation" | "friends";
}

const UserRoute = () => {
  const status = useAppSelector(selectUserFetchStatus);

  return status === "idle" ? <UserPage /> : <div>Loading...</div>;
};

export default UserRoute;
