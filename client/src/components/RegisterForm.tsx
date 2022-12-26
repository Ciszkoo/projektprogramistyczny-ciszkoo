import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps {
  setIsRegister: () => void;
}

const RegisterSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  gender: z.enum(["female", "male", "other"]),
});

type RegisterFormSchemaType = z.infer<typeof RegisterSchema>;

const RegisterForm = (props: RegisterFormProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterFormSchemaType> = (data) =>
    console.log(data);

  return (
    <form
      className="h-screen flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button onClick={props.setIsRegister}>&lt;&lt; Powrót </button>
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Imię"
        {...register("name")}
        disabled={isSubmitting}
      />
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Nazwisko"
        {...register("surname")}
        disabled={isSubmitting}
      />
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Adres e-mail"
        {...register("email")}
        disabled={isSubmitting}
      />
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Hasło"
        {...register("password")}
        disabled={isSubmitting}
      />
      <select className="input-sign" {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <button type="submit">Zarejestruj</button>
    </form>
  );
};

export default RegisterForm;
