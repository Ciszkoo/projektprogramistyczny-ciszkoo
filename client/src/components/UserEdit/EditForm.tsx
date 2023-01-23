import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchUserData, selectMyId } from "../../reducers/userReducer";

const EditFirstNameSchema = z.string().min(2).max(50);
const EditLastNameSchema = z.string().min(2).max(50);
const EditEmailSchema = z.string().email();
const EditDateOfBirthSchema = z.string(); // TODO: z.date()
const EditGenderSchema = z.enum(["male", "female", "other"]);

const schemas = {
  firstName: EditFirstNameSchema,
  lastName: EditLastNameSchema,
  email: EditEmailSchema,
  dateOfBirth: EditDateOfBirthSchema,
  gender: EditGenderSchema,
};

interface EditFormProps {
  label: string;
  propName: "firstName" | "lastName" | "email" | "dateOfBirth" | "gender";
}

const EditForm = (props: EditFormProps) => {
  const dispatch = useAppDispatch();

  const id = useAppSelector(selectMyId);

  const schema = z.object({ value: schemas[props.propName] });
  type SchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: SchemaType) => {
    try {
      await axios.patch(`/api/user/`, data, {
        params: { prop: props.propName },
      });
      await dispatch(fetchUserData(id));
      console.log("Updated");
    } catch (error) {
      error instanceof Error && error.message
        ? console.log(error.message)
        : console.log(error);
    }
  };

  // TODO: Add gender select
  return (
    <>
      <p className="font-bold">{props.label}:</p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`input-sign ${errors.value && "invalid"}`}
          placeholder={props.label}
          {...register("value")}
          disabled={isSubmitting}
          {...(props.propName === "dateOfBirth" && { type: "date" })}
        />
        <button
          className="w-min self-center p-2 bg-violet-200 rounded-full"
          type="submit"
        >
          Zaaktualizuj
        </button>
      </form>
    </>
  );
};

export default EditForm;
