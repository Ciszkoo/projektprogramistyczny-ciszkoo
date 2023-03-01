import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../context/AuthProvider";
import Card from "./Card/Card";
import Button from "./Button/Button";
import { useState } from "react";

interface LoginFormProps {
  setIsRegister: () => void;
}

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email jest wymagany" })
    .email({ message: "Podaj poprawny email" }),
  password: z
    .string({ required_error: "Hasło jest wymagane" })
    .min(8, { message: "Hasło musi mieć min. 8 znaków" })
    .max(50, { message: "Hasło może mieć max. znaków" }),
});

type LoginFormSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = (props: LoginFormProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormSchemaType>({ resolver: zodResolver(LoginSchema) });

  const { handleLogin } = useAuth();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
    handleLogin(data);
  };

  return (
    <Card customClass="self-center my-auto p-20 relative">
      <form
        className="flex flex-col flex-auto justify-center items-center self-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <input
            className={`input-sign ${errors.email && "invalid"}`}
            placeholder="Adres e-mail"
            {...register("email")}
            disabled={isSubmitting}
          />
          <input
            className={`input-sign ${errors.password && "invalid"}`}
            placeholder="Hasło"
            {...register("password")}
            disabled={isSubmitting}
            type="password"
          />
        </div>
        <div className="flex gap-2 mt-1">
          <Button type="submit" circle={false} lightness="300">
            Zaloguj
          </Button>
          <Button
            type="button"
            circle={false}
            lightness="300"
            handleOnClick={props.setIsRegister}
          >
            Utwórz konto
          </Button>
        </div>
      </form>
      <div className="absolute bottom-2">
        {errors.email && (
          <p className="text-rose-500 text-xs">{errors.email.message}</p>
        )}
        {errors.password && (
          <p className="text-rose-500 text-xs">{errors.password.message}</p>
        )}
      </div>
    </Card>
  );
};

export default LoginForm;
