import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch } from "../../reducers/hooks";
import { fetchCurrUserPosts } from "../../reducers/userPostsReducer";
import Button from "../Button/Button";

const PostStatusSchema = z.object({
  status: z.string().min(1).max(500),
});

type PostStatusSchemaType = z.infer<typeof PostStatusSchema>;

const PostStatusForm = () => {
  const { register, handleSubmit, reset } = useForm<PostStatusSchemaType>({
    resolver: zodResolver(PostStatusSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<PostStatusSchemaType> = async (data) => {
    const response = await axios.post("/api/posts/create", {
      content: data.status,
      privacy: "public",
    });
    if (response.status !== 200) {
      console.log("Couldn't post status");
      reset();
      return;
    }

    console.log("Status posted!");
    dispatch(fetchCurrUserPosts(0));
    reset();
  };

  return (
    <>
      <p className="flex-initial font-bold">Nowy post:</p>
      <form
        className="flex-auto flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          maxLength={500}
          rows={6}
          placeholder="Co u Ciebie słychać?"
          className="flex-auto resize-none p-2 border-2 border-solid border-violet-100 rounded-xl active:border-violet-200 focus:border-violet-200"
          {...register("status")}
        />
        <Button
          circle={false}
          lightness="200"
          type="submit"
          customClass="self-end"
        >
          Opublikuj
        </Button>
      </form>
    </>
  );
};

export default PostStatusForm;
