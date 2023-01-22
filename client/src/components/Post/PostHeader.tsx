import { EyeIcon, EyeSlashIcon, PencilSquareIcon, TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchUserData, selectMyId } from "../../reducers/userReducer";

interface PostHeaderProps {
  userId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  privacy: "public" | "private" | "friends";
  at: number;
}

const PostHeader = (props: PostHeaderProps) => {
  const myId = useAppSelector(selectMyId)

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleNavigateToProfile = async () => {
    await dispatch(fetchUserData(props.userId))

    navigate(`/user/${props.userId}`);
  };

  const date = new Date(props.at).toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex items-center gap-5 hover:cursor-pointer"
        onClick={handleNavigateToProfile}
      >
        <img
          src={`${props.avatar}/-/scale_crop/40x40/`}
          alt="avatar"
          className="rounded-full hover:opacity-80"
        />
        <p className="font-bold text-xl hover:underline">
          {props.firstName} {props.lastName}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {props.userId === myId && <TrashIcon className="h-5 w-5" />}
        {props.userId === myId && <PencilSquareIcon className="h-5 w-5" />}
        {props.privacy === "public" && (
          <EyeIcon className="h-5 w-5 text-green-500" />
        )}
        {props.privacy === "private" && (
          <EyeSlashIcon className="h-5 w-5 text-red-500" />
        )}
        {props.privacy === "friends" && (
          <UsersIcon className="h-5 w-5 text-blue-500" />
        )}
        <p className="text-xs">{date}</p>
      </div>
    </div>
  );
};

export default PostHeader;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

