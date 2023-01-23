import React, { useState } from "react";
import { Comment as CommentType } from "../../reducers/postsReducer";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

interface CommentsProps {
  comments: CommentType[];
  postId: string;
}
const Comments = (props: CommentsProps) => {
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  const commentsStripped = props.comments.slice(0, 3);

  const handleShowAllComments = () => {
    setShowAllComments(() => !showAllComments);
  };

  return (
    <div className="mt-5">
      <CommentForm postId={props.postId} />
      {showAllComments ? (
        <ul className="flex flex-col gap-2">
          {props.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={props.postId} />
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-2">
          {commentsStripped.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={props.postId} />
          ))}
        </ul>
      )}
      {props.comments.length > 3 && (
        <p
          className="text-xs mt-2 hover:underline hover:cursor-pointer"
          onClick={handleShowAllComments}
        >
          {showAllComments
            ? "Zwiń komentarze..."
            : "Pokaż wszystkie komentarze..."}
        </p>
      )}
    </div>
  );
};

export default Comments;
