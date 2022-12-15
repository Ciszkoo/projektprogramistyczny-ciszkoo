import { useForm, SubmitHandler } from "react-hook-form";

type Gender = "male" | "female" | "other";

interface IFormInput {
  name: string;
  surname: string;
  email: string;
  password: string;
  gender: Gender;
}

interface RegisterFormProps {
  setIsRegister: () => void;
}

// const userTenant: IFormInput = { email: "user@user.com", password: "user" };

const RegisterForm = (props: RegisterFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form
      className="h-screen flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button onClick={props.setIsRegister}>&lt;&lt; Powrót </button>
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Imię"
        {...register("name", { required: true })}
      />
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Nazwisko"
        {...register("surname", { required: true })}
      />
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Adres e-mail"
        {...register("email", { required: true })}
      />
      <input
        className={`input-sign ${errors.email && "invalid"}`}
        placeholder="Hasło"
        {...register("password", { required: true })}
      />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <button type="submit">Zarejestruj</button>
    </form>
  );
};

export default RegisterForm;
