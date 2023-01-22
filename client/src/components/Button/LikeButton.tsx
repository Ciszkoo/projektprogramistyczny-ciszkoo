import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React from "react";
import { useAppDispatch } from "../../reducers/hooks";
import { fetchFriendsPosts, fetchUserPosts } from "../../reducers/postsReducer";
import Button from "./Button";

interface LikeButtonProps {
  postId: string;
  userId: string;
}

type UnlikeButtonProps = LikeButtonProps;

export const LikeButton = (props: LikeButtonProps) => {
  const dispatch = useAppDispatch();

  const handleLike = async () => {
    try {
      await axios.put(`/api/posts/like/${props.postId}`);
      dispatch(fetchUserPosts({ id: props.userId, page: 0 }));
      dispatch(fetchFriendsPosts(0));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      circle={false}
      lightness="0"
      customClass="gap-2 text-violet-500 hover:bg-violet-400 hover:text-white"
      handleOnClick={handleLike}
    >
      <HandThumbUpIcon className="h-5 w-5" />
      <p className="">Lubię to</p>
    </Button>
  );
};

export const UnlikeButton = (props: UnlikeButtonProps) => {
  const dispatch = useAppDispatch();

  const handleUnlike = async () => {
    try {
      await axios.put(`/api/posts/unlike/${props.postId}`);
      dispatch(fetchUserPosts({ id: props.userId, page: 0 }));
      dispatch(fetchFriendsPosts(0));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      circle={false}
      lightness="0"
      customClass="gap-2 text-violet-500 hover:bg-violet-400 hover:text-white"
      handleOnClick={handleUnlike}
    >
      <HandThumbUpIcon className="h-5 w-5" />
      <p className="">Cofnij polubienie</p>
    </Button>
  );
};
