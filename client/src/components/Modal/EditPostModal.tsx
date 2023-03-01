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

interface EditPostModalProps {
  postId: string;
  content: string;
}
const PostSchema = z.object({
  content: z.string().min(1).max(500),
});

type PostSchemaType = z.infer<typeof PostSchema>;

const EditPostModal = (props: EditPostModalProps) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const { id } = useParams();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitted },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: { content: props.content },
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<PostSchemaType> = async (data) => {
    try {
      await axios.put(`/api/posts/${props.postId}`, data);
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
      <p>Edytuj post:</p>
      <textarea
        cols={50}
        rows={10}
        maxLength={500}
        className="resize-none bg-violet-50 rounded-xl p-2 focus:outline-none"
        spellCheck={false}
        disabled={isSubmitting || isSubmitted}
        {...register("content")}
      ></textarea>
      {isEdited && <p className="self-center">Post został edytowany</p>}
      {!isEdited && (
        <Button type="submit" lightness="200" circle={false}>
          Edytuj
        </Button>
      )}
    </form>
  );
};

export default EditPostModal;
