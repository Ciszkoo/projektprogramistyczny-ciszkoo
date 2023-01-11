import React from "react";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/userReducer";
import AddPhotoButton from "./AddPhotoButton";

interface UserCardProps {
  mainHandler: () => void;
}

const UserCard = (props: UserCardProps) => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-initial items-center p-5 rounded-xl bg-white mb-2 gap-4">
      <div className="bg-violet-100 w-36 h-36 rounded-full relative">
        <img
          src={`${user.data.avatar}/-/scale_crop/144x144/`}
          alt="avatar"
          className="bg-violet-100 w-36 h-36 rounded-full relative"
        />
        <AddPhotoButton />
      </div>
      <p className="text-4xl font-bold text-center mt-20">
        {user.data.firstName} {user.data.lastName}
      </p>
      <Link to={`/user/${user.data.id}/edit`} onClick={props.mainHandler}>
        <IdentificationIcon className="h-6 w-6 ml-2 mt-20" />
      </Link>
    </div>
  );
};

export default UserCard;
