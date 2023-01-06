import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../context/AuthProvider";

interface LoginFormProps {
  setIsRegister: () => void;
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

type LoginFormSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = (props: LoginFormProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormSchemaType>({ resolver: zodResolver(LoginSchema) });

  const { authHandler } = useAuth();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) =>
    authHandler(data);

  return (
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
        <button type="submit">Zaloguj</button>
      </div>
      <button type="button" onClick={props.setIsRegister}>
        Utwórz konto
      </button>
    </form>
  );
};

export default LoginForm;
