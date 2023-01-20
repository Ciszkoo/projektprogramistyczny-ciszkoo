import React from "react";
import { Outlet } from "react-router";
import UserCard from "./UserCard";

const UserPage = () => {
  return (
    <>
      <UserCard />
      <div className="px-5 flex flex-col items-center">
        <Outlet />
      </div>
    </>
  );
};

export default UserPage;
