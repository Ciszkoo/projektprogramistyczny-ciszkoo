import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch } from "../../reducers/hooks";
import {
  refreshFriendPost,
  refreshUserPost,
} from "../../reducers/postsReducer";
import { useParams } from "react-router";

const CommentSchema = z.object({
  content: z.string().min(1).max(250),
});

type CommentSchemaType = z.infer<typeof CommentSchema>;

interface CommentFormProps {
  postId: string;
}

const CommentForm = (props: CommentFormProps) => {
  const [value, setValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(e);
    setValue(val);
  };

  const dispatch = useAppDispatch();

  const { handleSubmit, register, reset } = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
  });

  const onSubmit: SubmitHandler<CommentSchemaType> = (data) => {
    try {
      reset();
      setValue("");
      axios.post(`/api/comments/${props.postId}`, data);
      typeof id === "undefined"
        ? dispatch(refreshFriendPost(props.postId))
        : dispatch(refreshUserPost(props.postId));
    } catch (error) {
      console.log(error);
    }
  };

  const { ref, onChange, ...rest } = register("content");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full my-2 bg-violet-50 p-2 rounded-xl flex items-center"
    >
      <textarea
        onChange={handleChange}
        placeholder="Skomentuj..."
        className="resize-none bg-inherit focus:outline-none flex-auto m-2"
        maxLength={250}
        ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
        {...rest}
      />
      <Button type="submit" customClass="self-end" lightness="50" circle={true}>
        <PaperAirplaneIcon className="h-5 w-5 text-violet-500" />
      </Button>
    </form>
  );
};

export default CommentForm;
