import React from "react";
import { Comment as CommentType } from "../../reducers/postsReducer";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

interface CommentsProps {
  comments: CommentType[];
  postId: string;
}
const Comments = (props: CommentsProps) => {
  return (
    <div className="mt-5">
     <CommentForm postId={props.postId}/> 
      <ul className="flex flex-col gap-2">
        {props.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
