import { object, string, TypeOf, enum as zenum } from "zod";

export const editSchema = object({
  body: object({
    value: string({
      required_error: "Content is required",
    }),
  }),
  query: object({
    prop: zenum(
      [
        "firstName",
        "lastName",
        "email",
        "password",
        "dateOfBirth",
        "gender",
        "avatar",
      ],
      { required_error: "Prop is required" }
    ),
  }),
});

export type EditBody = TypeOf<typeof editSchema>["body"];

export type EditQuery = TypeOf<typeof editSchema>["query"];
