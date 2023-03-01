import React from "react";
import { IdentificationIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import InvitationButton from "./InvitationButton";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/userReducer";
import AddPhotoButton from "./AddPhotoButton";

const UserCard = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-initial items-center p-5 rounded-xl bg-white mb-5 gap-4 shadow-lg">
      <div className="bg-violet-100 w-36 h-36 rounded-full relative">
        <img
          src={`${user.avatar}/-/scale_crop/144x144/`}
          alt="avatar"
          className="bg-violet-100 w-36 h-36 rounded-full relative"
        />
        {user.friendship === "me" && <AddPhotoButton />}
      </div>
      <p className="text-4xl font-bold text-center mt-20">
        {user.firstName} {user.lastName}
      </p>
      <Link to={`/user/${user.id}/details`}>
        <IdentificationIcon className="h-6 w-6 ml-2 mt-20" />
      </Link>

      <Link to={`/user/${user.id}/friends`}>
        <UsersIcon className="h-6 w-6 ml-2 mt-20" />
      </Link>
      {user.friendship !== "me" && <InvitationButton />}
    </div>
  );
};

export default UserCard;
