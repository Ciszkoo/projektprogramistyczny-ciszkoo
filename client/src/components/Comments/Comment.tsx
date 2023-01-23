import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import {
  Comment as CommentType,
  refreshFriendPost,
  refreshUserPost,
} from "../../reducers/postsReducer";
import { selectMyId } from "../../reducers/userReducer";
import Button from "../Button/Button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router";
import Card from "../Card/Card";
import { useModal } from "../Modal/Modal";
import EditCommentModal from "./EditCommentModal";

interface CommentProps {
  comment: CommentType;
  postId: string;
}

const Comment = (props: CommentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const { id } = useParams();
  const myId = useAppSelector(selectMyId);
  const data = new Date(props.comment.at).toISOString().split("T")[0];
  const dispatch = useAppDispatch();

  const handleHoverMyComment = () => {
    myId === props.comment.userId && setIsVisible(true);
  };

  const handleBlurMyComment = () => {
    setIsVisible(false);
  };

  const handleLike = async () => {
    try {
      props.comment.liked
        ? await axios.put(`/api/comments/unlike/${props.comment.id}`)
        : await axios.put(`/api/comments/like/${props.comment.id}`);
      typeof id === "undefined"
        ? dispatch(refreshFriendPost(props.postId))
        : dispatch(refreshUserPost(props.postId));
    } catch (error) {}
  };

  const navigate = useNavigate();

  const handleNavigateToProfile = async () => {
    navigate(`/user/${props.comment.userId}`);
  };

  const handleShowMenu = () => {
    setIsMenu(() => !isMenu);
  };

  const handleDeleteComment = async () => {
    setIsMenu(false);
    try {
      await axios.delete(`/api/comments/${props.comment.id}`);
      typeof id === "undefined"
        ? dispatch(refreshFriendPost(props.postId))
        : dispatch(refreshUserPost(props.postId));
    } catch (error) {
      console.log(error);
    }
  };

  const { openModal, modalPortal } = useModal(
    <EditCommentModal
      commentId={props.comment.id}
      content={props.comment.content}
      postId={props.postId}
    />
  );

  return (
    <li
      className="flex gap-4"
      onPointerOver={handleHoverMyComment}
      onPointerLeave={handleBlurMyComment}
    >
      <img
        src={`${props.comment.avatar}/-/scale_crop/40x40/`}
        alt="avatar"
        className="rounded-full w-[40px] h-[40px] hover:cursor-pointer hover:opacity-80"
        onClick={handleNavigateToProfile}
      />
      <div className="max-w-[80%]">
        <div className="bg-violet-50 p-2 rounded-xl text-sm">
          <div className="flex gap-5">
            <p
              className="font-bold hover:underline hover:cursor-pointer"
              onClick={handleNavigateToProfile}
            >
              {props.comment.firstName} {props.comment.lastName}
            </p>
          </div>
          <p className="break-all">{props.comment.content}</p>
        </div>
        <div className="text-xs pl-2 pt-1 flex gap-5">
          <p>{data}</p>
          <button
            onClick={handleLike}
            className={
              props.comment.liked
                ? "text-violet-500 hover:underline hover:cursor-pointer"
                : "hover:underline"
            }
          >
            Lubię to
          </button>
          <p>{props.comment.likes} lubi to</p>
        </div>
      </div>
      <Button
        lightness="0"
        circle={true}
        customClass={`flex-init relative ${
          isVisible ? "visible" : "invisible"
        }`}
        handleOnClick={handleShowMenu}
      >
        {!isMenu && <EllipsisHorizontalIcon className="w-5 h-5" />}
        {isMenu && (
          <Card onBlur={handleShowMenu} customClass={"absolute top-0 left-0"}>
            <div
              className="hover:bg-violet-50 rounded-xl p-2"
              onClick={handleDeleteComment}
            >
              Usuń
            </div>
            <div
              className="hover:bg-violet-50 rounded-xl p-2"
              onClick={openModal}
            >
              {" "}
              Edytuj
            </div>{" "}
          </Card>
        )}
      </Button>
      {modalPortal}
    </li>
  );
};

export default Comment;
