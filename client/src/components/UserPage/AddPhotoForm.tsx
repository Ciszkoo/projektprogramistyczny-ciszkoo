import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchUserData, selectMyId } from "../../reducers/userReducer";
import uploadcareClient from "../../utils/uploadcareClient";
import Button from "../Button/Button";

type Input = {
  image: FileList;
};

const AddPhotoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<Input>();
  const [img, setImg] = useState<ArrayBuffer>();
  const image = watch("image");

  const id = useAppSelector(selectMyId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const setting = async () => {
      setImg(await image[0].arrayBuffer());
    };
    if (image === undefined) {
      setImg(undefined);
      return;
    }
    setting();
  }, [image]);

  const onSubmit = async (input: Input) => {
    const image = input.image[0];
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpeg" &&
      image.type !== "image/jpg"
    ) {
      console.log("Wrong file type");
      reset();
      return;
    }
    const upload = await uploadcareClient
      .uploadFile(image)
      .then((file) => file.uuid)
      .catch((err) => console.log(err));

    if (!upload) return;
    const res = await axios.patch(
      "/api/user",
      { value: `https://ucarecdn.com/${upload}/` },
      { params: { prop: "avatar" } }
    );
    if (res.status !== 200) return;
    await dispatch(fetchUserData(id));
    console.log("Uploaded!");
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
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        lightness="200"
        circle={false}
        customClass="self-center"
      >
        Dodaj zdjęcie profilowe
      </Button>
    </form>
  );
};

export default AddPhotoForm;
