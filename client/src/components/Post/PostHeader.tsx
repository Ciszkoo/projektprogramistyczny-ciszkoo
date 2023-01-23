import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../reducers/hooks";
import { selectMyId } from "../../reducers/userReducer";
import DeletePostModal from "../Modal/DeletePostModal";
import EditPostModal from "../Modal/EditPostModal";
import { useModal } from "../Modal/Modal";

interface PostHeaderProps {
  userId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  privacy: "public" | "private" | "friends";
  at: number;
  postId: string;
  content: string;
  isVisible: boolean;
}

const PostHeader = (props: PostHeaderProps) => {
  const myId = useAppSelector(selectMyId);

  const navigate = useNavigate();

  const handleNavigateToProfile = async () => {
    navigate(`/user/${props.userId}`);
  };

  const date = new Date(props.at).toISOString().split("T")[0];

  const removeModal = useModal(<DeletePostModal postId={props.postId} />);

  const editModal = useModal(<EditPostModal postId={props.postId} content={props.content} />);

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
        {props.userId === myId && props.isVisible && (
          <TrashIcon
            className="h-5 w-5 hover:cursor-pointer"
            onClick={removeModal.openModal}
          />
        )}
        {props.userId === myId && props.isVisible && (
          <PencilSquareIcon
            className="h-5 w-5 hover:cursor-pointer"
            onClick={editModal.openModal}
          />
        )}
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
      {removeModal.modalPortal}
      {editModal.modalPortal}
    </div>
  );
};

export default PostHeader;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
