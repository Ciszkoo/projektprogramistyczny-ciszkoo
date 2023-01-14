import React from "react";
import { Outlet } from "react-router";
import UserCard from "./UserCard";

const UserPage = () => {
  return (
    <div className="w-[80%] flex flex-col mx-auto py-5">
      <UserCard />
      <div className="px-5 flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
