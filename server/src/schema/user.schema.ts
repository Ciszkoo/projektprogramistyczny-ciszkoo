import { object, string, enum as zenum, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    })
      .min(2, "First name is too short - should be min 2 chars")
      .max(50, "First name is too long - should be max 50 chars"),
    lastName: string({
      required_error: "Last name is required",
    })
      .min(2, "Last name is too short - should be min 2 chars")
      .max(50, "Last name is too long - should be max 50 chars"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password is too short - should be min 8 chars")
      .max(50, "Password is too long - should be max 50 chars"),
    dateOfBirth: string({       // todo - use date type
      required_error: "Date of birth is required",
    }),
    gender: zenum(["male", "female", "other"], {
      required_error: "Gender is required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
