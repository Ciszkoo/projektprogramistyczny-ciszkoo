import React from "react";
import { useNavigate } from "react-router";
import {
  fetchFriendsPosts,
  fetchUserPosts,
  Post as PostType,
} from "../../reducers/postsReducer";
import Card from "../Card/Card";
import {
  UsersIcon,
  EyeIcon,
  EyeSlashIcon,
  HandThumbUpIcon,
  TrashIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";
import Button from "../Button/Button";
import { useAppDispatch } from "../../reducers/hooks";
import axios from "axios";
import { fetchUserData } from "../../reducers/userReducer";

interface PostProps {
  post: PostType;
  whose: "my" | "other" | "all";
  refresh?: () => void;
}

const Post = (props: PostProps) => {
  const date = new Date(props.post.at).toISOString().split("T")[0];

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleNavigateToProfile = async () => {
    await dispatch(fetchUserData(props.post.userId))

    navigate(`/user/${props.post.userId}`);
  };

  const handleLike = async () => {
    try {
      await axios.put(`/api/posts/like/${props.post.postId}`);
      dispatch(fetchUserPosts({ id: props.post.userId, page: 0 }))
      dispatch(fetchFriendsPosts(0));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.put(`/api/posts/unlike/${props.post.postId}`);
      dispatch(fetchUserPosts({ id: props.post.userId, page: 0 }))
      dispatch(fetchFriendsPosts(0));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card customClass="my-5">
      <li>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-5 hover:cursor-pointer"
            onClick={handleNavigateToProfile}
          >
            <img
              src={`${props.post.avatar}/-/scale_crop/40x40/`}
              alt="avatar"
              className="rounded-full"
            />
            <p className="font-bold text-xl">
              {props.post.firstName} {props.post.lastName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {props.whose === "my" && <TrashIcon className="h-5 w-5" />}
            {props.whose === "my" && <PencilSquareIcon className="h-5 w-5" />}
            {props.post.privacy === "public" && (
              <EyeIcon className="h-5 w-5 text-green-500" />
            )}
            {props.post.privacy === "private" && (
              <EyeSlashIcon className="h-5 w-5 text-red-500" />
            )}
            {props.post.privacy === "friends" && (
              <UsersIcon className="h-5 w-5 text-blue-500" />
            )}
            <p className="text-xs">{date}</p>
          </div>
        </div>
        <p className="p-5">{props.post.content}</p>
        <div className="flex items-center gap-5">
          {!props.post.liked ? (
            <Button
              circle={false}
              lightness="0"
              customClass="gap-2 text-violet-500 hover:bg-violet-400 hover:text-white"
              handleOnClick={handleLike}
            >
              <HandThumbUpIcon className="h-5 w-5" />
              <p className="">Lubię to</p>
            </Button>
          ) : (
            <Button
              circle={false}
              lightness="0"
              customClass="gap-2 text-violet-500 hover:bg-violet-400 hover:text-white"
              handleOnClick={handleUnlike}
            >
              <HandThumbUpIcon className="h-5 w-5" />
              <p className="">Cofnij polubienie</p>
            </Button>
          )}
          <p>{props.post.likes} użytkowników lubi to!</p>
        </div>
      </li>
    </Card>
  );
};

export default Post;
