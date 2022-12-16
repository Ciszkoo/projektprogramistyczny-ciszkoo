import { useForm, SubmitHandler } from "react-hook-form";

import { useAuth } from "../context/AuthProvider";

interface IFormInput {
  email: string;
  password: string;
}

interface LoginFormProps {
  setIsRegister: () => void;
}

const userTenant: IFormInput = { email: "user@user.com", password: "user" };

const LoginForm = (props: LoginFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const { authHandler } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = () => authHandler();
  
  // const onSubmit: SubmitHandler<IFormInput> = (data) =>
  //   data.email === userTenant.email && data.password === userTenant.password
  //     ? authHandler()
  //     : console.log("niezalogowano");

  return (
    <form
      className="h-screen flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
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
        <button type="submit">Zaloguj</button>
      </div>
      <button type="button" onClick={props.setIsRegister}>
        Utwórz konto
      </button>
    </form>
  );
};

export default LoginForm;
