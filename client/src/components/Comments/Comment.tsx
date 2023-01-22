import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import {
  Comment as CommentType,
  fetchFriendsPosts,
  fetchUserPosts,
} from "../../reducers/postsReducer";
import { fetchUserData, selectMyId, selectUser } from "../../reducers/userReducer";
import Button from "../Button/Button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

interface CommentProps {
  comment: CommentType;
}

const Comment = (props: CommentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const myId = useAppSelector(selectMyId);

  const handleHoverMyComment = () => {
    myId === props.comment.userId && setIsVisible(true);
  };

  const handleBlurMyComment = () => {
    setIsVisible(false);
  };

  const data = new Date(props.comment.at).toISOString().split("T")[0];

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleLike = async () => {
    try {
      props.comment.liked
        ? await axios.put(`/api/comments/unlike/${props.comment.id}`)
        : await axios.put(`/api/comments/like/${props.comment.id}`);
      await dispatch(fetchFriendsPosts(0));
      await dispatch(fetchUserPosts({ id: user.id, page: 0 }));
    } catch (error) {}
  };

  const navigate = useNavigate();

  const handleNavigateToProfile = async () => {
    await dispatch(fetchUserData(props.comment.userId));
    navigate(`/user/${props.comment.userId}`);
  };

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
        customClass={`flex-init ${isVisible ? "visible" : "invisible"}`}
      >
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </Button>
    </li>
  );
};

export default Comment;
