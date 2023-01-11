import { object, string, TypeOf } from "zod";

export const createPostSchema = object({
  body: object({
    content: string({
      required_error: "Post content is required",
    })
      .min(1, "Post content is too short - should be min 1 chars")
      .max(500, "Post content is too long - should be max 500 chars"),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
