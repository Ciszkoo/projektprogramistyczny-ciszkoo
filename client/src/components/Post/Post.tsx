import React from "react";
import { Post as PostType } from "../../reducers/postsReducer";
import Card from "../Card/Card";
import PostHeader from "./PostHeader";
import { LikeButton, UnlikeButton } from "../Button/LikeButton";
import Comments from "../Comments/Comments";

interface PostProps {
  post: PostType;
}

const Post = (props: PostProps) => {
  return (
    <Card customClass="my-5">
      <li>
        <PostHeader
          userId={props.post.userId}
          avatar={props.post.avatar}
          firstName={props.post.firstName}
          lastName={props.post.lastName}
          privacy={props.post.privacy}
          at={props.post.at}
        />
        <p className="p-5 break-all">{props.post.content}</p>
        <div className="flex items-center gap-5">
          {!props.post.liked ? (
            <LikeButton postId={props.post.postId} userId={props.post.userId} />
          ) : (
            <UnlikeButton
              postId={props.post.postId}
              userId={props.post.userId}
            />
          )}
          <p>{props.post.likes} użytkowników lubi to!</p>
        </div>
        <Comments comments={props.post.comments} postId={props.post.postId}/>
      </li>
    </Card>
  );
};

export default Post;
