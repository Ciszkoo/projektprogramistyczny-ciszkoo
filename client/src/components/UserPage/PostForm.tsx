import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchUserPosts } from "../../reducers/postsReducer";
import { selectMyId } from "../../reducers/userReducer";
import Button from "../Button/Button";
import Card from "../Card/Card";

const PostSchema = z.object({
  status: z.string().min(1).max(500),
  privacy: z.enum(["public", "friends", "private"]),
});

type PostSchemaType = z.infer<typeof PostSchema>;

const PostStatusForm = () => {
  const myId = useAppSelector(selectMyId);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

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
    <Card customClass="w-full mb-5">
      <p className="flex-initial font-bold">Nowy post:</p>
      <form
        className="flex-auto flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          className="flex-auto resize-none p-2 border-2 border-solid border-violet-100 rounded-xl focus:outline-violet-400"
          maxLength={500}
          rows={6}
          placeholder="Co u Ciebie słychać?"
          {...register("status")}
          disabled={isSubmitting}
          spellCheck={false}
        />
        <div className="flex flex-row-reverse gap-5">
          <Button circle={false} lightness="200" type="submit">
            Opublikuj
          </Button>
          <select
            className="px-5 focus:outline-none bg-white rounded-t-xl hover:cursor-pointer"
            {...register("privacy")}
            disabled={isSubmitting}
          >
            <option value="public">Publiczny</option>
            <option value="friends">Tylko dla znajomych</option>
            <option value="private">Tylko dla mnie</option>
          </select>
        </div>
      </form>
    </Card>
  );
};

export default PostStatusForm;
