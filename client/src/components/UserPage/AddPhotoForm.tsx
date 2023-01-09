import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Input = {
  image: FileList;
};

const AddPhotoForm = () => {
  const { register, handleSubmit, reset } = useForm<Input>();
  const [img, setImg] = useState<ArrayBuffer>();

  const onSubmit = async (input: Input) => {
    const image = input.image[0];
    setImg(await image.arrayBuffer());
    console.log(input.image[0]);
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpeg" &&
      image.type !== "image/jpg"
    ) {
      console.log("Wrong file type");
      reset();
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    try {
      await axios.post("http://localhost:5000/api/users/me/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      error instanceof Error && error.message
        ? console.log(error.message)
        : console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {img && <img src={URL.createObjectURL(new Blob([img]))} alt="" />}
      <input
        type="file"
        className="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700"
        accept="image/jpg, image/jpeg, image/png"
        {...register("image")}
      />
      <button className="bg-violet-200 w-fit self-center p-2 rounded-full">
        Dodaj zdjęcie profilowe
      </button>
    </form>
  );
};

export default AddPhotoForm;
