import React from "react";
import { useAppSelector } from "../reducers/hooks";
import { selectUser } from "../reducers/userReducer";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";

const UserPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="w-[80%] flex flex-col h-full m-auto flex-initial py-2">
      <div className="flex flex-initial items-center p-5 rounded-xl bg-white mb-2 gap-4">
        <div className="bg-violet-100 w-36 h-36 rounded-full"></div>
        <p className="text-4xl font-bold text-center mt-20">
          {user.data.firstName} {user.data.lastName}
        </p>
        <Link to={`/user/${user.data.id}/edit`} replace>
          <IdentificationIcon className="h-6 w-6 ml-2 mt-20" />
        </Link>
      </div>
      <div className="rounded-xl bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
