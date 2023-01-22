import React, { useState } from "react";
import Post from "../Post/Post";
import { Post as PostI } from "../../reducers/postsReducer";

interface PostsListProps {
  posts: PostI[];
}

const PostsList = (props: PostsListProps) => {
  return (
    <ul className="w-[80%]">
      {props.posts.map((s) => {
        return (
          <Post
            key={s.postId}
            post={s}
            whose={"other"}
          />
        );
      })}
    </ul>
  );
};

export default PostsList;
