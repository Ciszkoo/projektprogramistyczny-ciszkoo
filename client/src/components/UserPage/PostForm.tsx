import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchUserPosts } from "../../reducers/postsReducer";
import { selectMyId } from "../../reducers/userReducer";
import Button from "../Button/Button";

const PostSchema = z.object({
  status: z.string().min(1).max(500),
  privacy: z.enum(["public", "friends", "private"]),
});

type PostSchemaType = z.infer<typeof PostSchema>;

const PostStatusForm = () => {
  const { register, handleSubmit, reset } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  const myId = useAppSelector(selectMyId)

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<PostSchemaType> = async (data) => {
    const response = await axios.post("/api/posts/create", {
      content: data.status,
      privacy: data.privacy,
    });
    if (response.status !== 200) {
      console.log("Couldn't post status");
      reset();
      return;
    }

    console.log("Status posted!");
    dispatch(fetchUserPosts({ id: myId, page: 0 }));
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
          className="flex-auto resize-none p-2 border-2 border-solid border-violet-100 rounded-xl focus:outline-violet-400"
          {...register("status")}
        />
        <div className="flex flex-row-reverse gap-5">
          <Button
            circle={false}
            lightness="200"
            type="submit"
          >
            Opublikuj
          </Button>
          <select {...register("privacy")} className="px-5 focus:outline-none bg-white rounded-t-xl hover:cursor-pointer">
            <option value="public">Publiczny</option>
            <option value="friends">Tylko dla znajomych</option>
            <option value="private">Tylko dla mnie</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default PostStatusForm;
