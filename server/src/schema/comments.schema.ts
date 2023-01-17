import { object, string, TypeOf } from "zod";

export const createCommentSchema = object({
  body: object({
    content: string({
      required_error: "Comment content is required",
    })
      .min(1, "Comment content is too short - should be min 1 chars")
      .max(250, "Comment content is too long - should be max 250 chars"),
  }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>["body"];

export type EditCommentInput = TypeOf<typeof createCommentSchema>["body"];
