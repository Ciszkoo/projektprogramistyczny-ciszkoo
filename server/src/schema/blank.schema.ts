import { object, TypeOf, undefined } from "zod";

export const blankSchema = object({
  body: object({}).strict(),
});

export type BlankInput = TypeOf<typeof blankSchema>["body"];
