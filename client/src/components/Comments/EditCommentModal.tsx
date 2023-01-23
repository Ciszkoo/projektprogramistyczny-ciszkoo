import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";
import { useAppDispatch } from "../../reducers/hooks";
import {
  refreshFriendPost,
  refreshUserPost,
} from "../../reducers/postsReducer";
import Button from "../Button/Button";

interface EditCommentModalProps {
  commentId: string;
  content: string;
  postId: string;
}
const CommentSchema = z.object({
  content: z.string().min(1).max(250),
});

type CommentSchemaType = z.infer<typeof CommentSchema>;

const EditCommentModal = (props: EditCommentModalProps) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitted },
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: { content: props.content },
  });

  const onSubmit: SubmitHandler<CommentSchemaType> = async (data) => {
    try {
      await axios.put(`/api/comments/${props.commentId}`, data);
      typeof id === "undefined"
        ? dispatch(refreshFriendPost(props.postId))
        : dispatch(refreshUserPost(props.postId));
      setIsEdited(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <p>Edytuj komentarz:</p>
      <textarea
        cols={50}
        rows={5}
        maxLength={250}
        className="resize-none bg-violet-50 rounded-xl p-2 focus:outline-none"
        spellCheck={false}
        disabled={isSubmitting || isSubmitted}
        {...register("content")}
      ></textarea>
      {isEdited && <p className="self-center">Komentarz został edytowany</p>}
      {!isEdited && (
        <Button type="submit" lightness="200" circle={false}>
          Edytuj
        </Button>
      )}
    </form>
  );
};

export default EditCommentModal;
