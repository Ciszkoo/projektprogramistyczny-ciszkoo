import React from "react";
import { IdentificationIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks";
import {
  selectIsCurrentUser,
  selectVisibleUser,
} from "../../reducers/userReducer";
import AddPhotoButton from "./AddPhotoButton";

const UserCard = () => {
  const user = useAppSelector(selectVisibleUser);
  const isCurrent = useAppSelector(selectIsCurrentUser);

  return (
    <div className="flex flex-initial items-center p-5 rounded-xl bg-white mb-5 gap-4 shadow-lg">
      <div className="bg-violet-100 w-36 h-36 rounded-full relative">
        <img
          src={`${user.avatar}/-/scale_crop/144x144/`}
          alt="avatar"
          className="bg-violet-100 w-36 h-36 rounded-full relative"
        />
        {isCurrent && <AddPhotoButton />}
      </div>
      <p className="text-4xl font-bold text-center mt-20">
        {user.firstName} {user.lastName}
      </p>
      <Link to={`/user/${user.id}/edit`}>
        <IdentificationIcon className="h-6 w-6 ml-2 mt-20" />
      </Link>
      <Link to={`/user/${user.id}/friends`}>
        <UsersIcon className="h-6 w-6 ml-2 mt-20" />
      </Link>
    </div>
  );
};

export default UserCard;
