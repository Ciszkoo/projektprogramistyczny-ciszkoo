import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

interface RegisterFormProps {
  setIsRegister: () => void;
}

const RegisterSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  dateOfBirth: z.string(), // TODO: z.date()
  gender: z.enum(["male", "female", "other"]),
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
  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (data) => {
    try {
      await axios.post("/api/user/create", data);
      console.log("Account created");
      props.setIsRegister();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        return;
      }
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col flex-auto justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button onClick={props.setIsRegister}>&lt;&lt; Powrót </button>
      <input
        className={`input-sign ${errors.firstName && "invalid"}`}
        placeholder="Imię"
        {...register("firstName")}
        disabled={isSubmitting}
      />
      <input
        className={`input-sign ${errors.lastName && "invalid"}`}
        placeholder="Nazwisko"
        {...register("lastName")}
        disabled={isSubmitting}
      />
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
      <input
        className={`input-sign ${errors.dateOfBirth && "invalid"}`}
        placeholder="Data urodzenia"
        {...register("dateOfBirth")}
        disabled={isSubmitting}
        type="date"
      />
      <select className="input-sign" {...register("gender")}>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>
      <button type="submit">Zarejestruj</button>
    </form>
  );
};

export default RegisterForm;
