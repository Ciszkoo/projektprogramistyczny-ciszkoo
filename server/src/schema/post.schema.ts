import { object, string, TypeOf, enum as zenum } from "zod";

export const createPostSchema = object({
  body: object({
    content: string({
      required_error: "Post content is required",
    })
      .min(1, "Post content is too short - should be min 1 chars")
      .max(500, "Post content is too long - should be max 500 chars"),
    privacy: zenum(["public", "private", "friends"], {
      required_error: "Privacy is required",
    }),
    image: string().optional(),
  }),
});

export const editPostSchema = object({
  body: object({
    content: string({
      required_error: "Post content is required",
    })
      .min(1, "Post content is too short - should be min 1 chars")
      .max(500, "Post content is too long - should be max 500 chars")
      .optional(),
    privacy: zenum(["public", "private", "friends"], {
      required_error: "Privacy is required",
    }).optional(),
    image: string().optional(),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];

export type EditPostInput = TypeOf<typeof editPostSchema>["body"];
