import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const PostStatusSchema = z.object({
  status: z.string().min(1).max(500),
});

type PostStatusSchemaType = z.infer<typeof PostStatusSchema>;

const PostStatusForm = () => {
  const { register, handleSubmit, reset } = useForm<PostStatusSchemaType>({
    resolver: zodResolver(PostStatusSchema),
  });

  const onSubmit: SubmitHandler<PostStatusSchemaType> = async (data) => {
    const response = await axios.post("/api/users/me/status", {
      content: data.status,
    });
    if (response.status !== 200) {
      console.log("Couldn't post status");
      reset();
      return;
    }

    console.log("Status posted!");
    reset();
  };

  return (
    <>
      <p className="flex-initial font-bold">Nowy status:</p>
      <form
        className="flex-auto flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          maxLength={500}
          rows={6}
          placeholder="Co u Ciebie słychać?"
          className="flex-auto resize-none p-2 border-2 border-solid border-violet-100 rounded-xl"
          {...register("status")}
        />
        <button
          type="submit"
          className="flex self-end w-fit p-2 bg-violet-200 rounded-full"
        >
          Opublikuj
        </button>
      </form>
    </>
  );
};

export default PostStatusForm;