import React from "react";
import { Status } from "../UserPage/StatusList";

interface PostProps {
  post: Status
}

const Post = (props: PostProps) => {
  return (
    <li className="my-5 p-5 bg-white rounded-xl shadow-lg">
      <p>{props.post.firstName} {props.post.lastName} {props.post.at}</p>
      <p>{props.post.content}</p>
      <p>{props.post.postId}</p>
    </li>
  );
}

export default Post;