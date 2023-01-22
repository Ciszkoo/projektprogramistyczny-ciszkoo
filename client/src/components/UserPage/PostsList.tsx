import React from "react";
import Post from "../Post/Post";
import { Post as PostI } from "../../reducers/postsReducer";

interface PostsListProps {
  posts: PostI[];
}

const PostsList = (props: PostsListProps) => {
  return (
    <ul className="w-full">
      {props.posts.map((s) => {
        return <Post key={s.postId} post={s} />;
      })}
    </ul>
  );
};

export default PostsList;
