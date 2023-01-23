import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchFriendsPosts, fetchUserPosts } from "../../reducers/postsReducer";
import { selectMyId } from "../../reducers/userReducer";
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
  const { handleSubmit, register} =
    useForm<PostSchemaType>({
      resolver: zodResolver(PostSchema),
      defaultValues: { content: props.content },
    });

  const myId = useAppSelector(selectMyId)

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<PostSchemaType> = async (data) => {
    try {
      await axios.put(`/api/posts/${props.postId}`, data)
      dispatch(fetchUserPosts({ id: myId, page: 0 }));
      dispatch(fetchFriendsPosts(0));
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <p>Edytuj post:</p>
      <textarea
        cols={50}
        rows={10}
        className="resize-none bg-violet-50 rounded-xl p-2 focus:outline-none"
        {...register("content")}
      ></textarea>
      <Button type="submit" lightness="200" circle={false}>
        Edytuj
      </Button>
    </form>
  );
};

export default EditPostModal;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

