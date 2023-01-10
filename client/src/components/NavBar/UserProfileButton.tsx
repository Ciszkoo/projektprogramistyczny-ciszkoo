import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/userReducer";

const UserProfileButton = () => {
  const user = useAppSelector(selectUser);

  return (
    <Link to={`/user/${user.data.id}`}>
      <div className="bg-violet-300 h-10 w-10 rounded-full flex items-center justify-center mr-2">
        <UserIcon className="h-6 w-6" />
      </div>
    </Link>
  );
};

export default UserProfileButton;
