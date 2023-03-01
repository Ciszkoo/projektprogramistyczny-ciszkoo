import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { deletePost, refreshUserPost } from "../../reducers/postsReducer";
import { selectMyId } from "../../reducers/userReducer";
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

  const { openModal, modalPortal } = useModal(
    <EditPostModal postId={props.postId} content={props.content} />
  );
  const dispatch = useAppDispatch();

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/api/posts/${props.postId}`);
      dispatch(deletePost({ postId: props.postId }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePrivacy = async () => {
    if (props.userId !== myId) return;
    const newPrivacy =
      props.privacy === "public"
        ? "friends"
        : props.privacy === "friends"
        ? "private"
        : "public";
    try {
      await axios.put(`/api/posts/${props.postId}`, { privacy: newPrivacy });
      dispatch(refreshUserPost(props.postId));
    } catch (error) {
      console.log(error);
    }
  };

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
            onClick={handleDeletePost}
          />
        )}
        {props.userId === myId && props.isVisible && (
          <PencilSquareIcon
            className="h-5 w-5 hover:cursor-pointer"
            onClick={openModal}
          />
        )}
        {props.privacy === "public" && (
          <EyeIcon
            className={`h-5 w-5 text-green-500 ${
              myId === props.userId && "hover:cursor-pointer"
            }`}
            onClick={handleChangePrivacy}
          />
        )}
        {props.privacy === "friends" && (
          <UsersIcon
            className={`h-5 w-5 text-violet-500 ${
              myId === props.userId && "hover:cursor-pointer"
            }`}
            onClick={handleChangePrivacy}
          />
        )}
        {props.privacy === "private" && (
          <EyeSlashIcon
            className={`h-5 w-5 text-red-500 ${
              myId === props.userId && "hover:cursor-pointer"
            }`}
            onClick={handleChangePrivacy}
          />
        )}
        <p className="text-xs">{date}</p>
      </div>
      {modalPortal}
    </div>
  );
};

export default PostHeader;
