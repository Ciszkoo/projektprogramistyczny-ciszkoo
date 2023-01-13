import React from "react";
import { Outlet } from "react-router";
import UserCard from "./UserCard";

const UserPage = () => {
  return (
    <>
      <UserCard />
      <div className="rounded-xl bg-white flex-initial">
        <Outlet />
      </div>
    </>
  );
};

export default UserPage;
