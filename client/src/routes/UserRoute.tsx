import React from "react";
import UserPage from "../components/UserPage/UserPage";

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
  return (
      <UserPage />
  );
};


export default UserRoute;
