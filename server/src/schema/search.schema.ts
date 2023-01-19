import { object, string, TypeOf } from "zod";

export const searchSchema = object({
  query: object({
    query: string({
      required_error: "Content is required",
    })
      .min(1, "Content is too short - should be min 1 chars")
      .max(50, "Content is too long - should be max 50 chars"),
  }),
});

export type SearchInput = TypeOf<typeof searchSchema>["query"];
