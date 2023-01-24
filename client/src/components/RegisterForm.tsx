import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Card from "./Card/Card";
import Button from "./Button/Button";
import { useState } from "react";

interface RegisterFormProps {
  setIsRegister: () => void;
}

const RegisterSchema = z.object({
  firstName: z
    .string({ required_error: "Podaj imię" })
    .min(2, { message: "Imię musi mieć min. 2 znaki" })
    .max(50, { message: "Imię może mieć max. 50 znaków" }),
  lastName: z
    .string({ required_error: "Podaj nazwisko" })
    .min(2, { message: "Nazwisko musi mieć min. 2 znaki" })
    .max(50, { message: "Nazwisko może mieć max. 50 znaków" }),
  email: z
    .string({ required_error: "Podaj email" })
    .email({ message: "Podaj poprawny email" }),
  password: z
    .string({ required_error: "Podaj hasło" })
    .min(8, { message: "Hasło musi mieć min. 8 znaków" })
    .max(50, { message: "Hasło może mieć max. 50 znaków" }),
  dateOfBirth: z
    .date({
      required_error: "Wybierz datę urodzenia",
      invalid_type_error: "Wybierz datę urodzenia",
    })
    .min(new Date("1900-01-01"), { message: "Chyba jesteś trochę za stary" })
    .max(new Date(), { message: "Chyba jesteś trochę za młody" }),
  gender: z.enum(["male", "female", "other"]),
});

type RegisterFormSchemaType = z.infer<typeof RegisterSchema>;

const RegisterForm = (props: RegisterFormProps) => {
  const [registerFailed, setRegisterFailed] = useState<boolean>(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (data) => {
    try {
      setRegisterFailed(false);
      const mapped = {...data, dateOfBirth: data.dateOfBirth.toISOString().split("T")[0]}
      await axios.post("/api/user", mapped);
      console.log("Account created");
      props.setIsRegister();
    } catch (error) {
      setRegisterFailed(true);
      console.log(error);
    }
  };

  return (
    <Card customClass="self-center my-auto p-20 relative">
      <form
        className="flex flex-col flex-auto justify-center items-center gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button
          lightness="300"
          circle={false}
          handleOnClick={props.setIsRegister}
          customClass="absolute top-2 right-2"
        >
          &lt;&lt; Powrót{" "}
        </Button>
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
        <select className="input-sign w-full" {...register("gender")}>
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
          <option value="other">Inna płeć</option>
        </select>
        <input
          className={`input-sign ${errors.dateOfBirth && "invalid"}`}
          placeholder="Data urodzenia"
          {...register("dateOfBirth", { valueAsDate: true })}
          disabled={isSubmitting}
          type="date"
          max={new Date().toISOString().split("T")[0]}
        />
        <Button type="submit" circle={false} lightness="300">
          Zarejestruj
        </Button>
      </form>
      <div className="absolute bottom-2">
        {registerFailed && (
          <p className="text-rose-500 text-xs">Email jest już zajęty!</p> 
        )}
        {errors.firstName && (
          <p className="text-rose-500 text-xs">{errors.firstName.message}</p>
        )}
        {errors.lastName && (
          <p className="text-rose-500 text-xs">{errors.lastName.message}</p>
        )}
        {errors.email && (
          <p className="text-rose-500 text-xs">{errors.email.message}</p>
        )}
        {errors.password && (
          <p className="text-rose-500 text-xs">{errors.password.message}</p>
        )}
        {errors.dateOfBirth && (
          <p className="text-rose-500 text-xs">{errors.dateOfBirth.message}</p>
        )}
      </div>
    </Card>
  );
};

export default RegisterForm;
