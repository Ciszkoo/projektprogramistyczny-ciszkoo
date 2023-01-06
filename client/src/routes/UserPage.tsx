import React from "react";
import Temp from "../components/Temp";
import { useAppSelector } from "../reducers/hooks";
import { selectUser } from "../reducers/userReducer";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const UserPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="w-[80%] h-full m-auto flex-initial bg-white">
      <div className="flex items-center p-5">
        <div className="bg-violet-100 w-36 h-36 rounded-full"></div>
        <p className="text-4xl font-bold text-center mt-20">
          {user.data.name} {user.data.surname}
        </p>
        <Link to={`/user/${user.data.email}/edit`} replace>
          <IdentificationIcon className="h-6 w-6 ml-2 mt-20" />
        </Link>
      </div>
      <Temp />
    </div>
  );
};

export default UserPage;
