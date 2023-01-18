import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../reducers/hooks";
import { fetchCurrUserData } from "../../reducers/userReducer";
import uploadcareClient from "../../utils/uploadcareClient";

type Input = {
  image: FileList;
};

const AddPhotoForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<Input>();
  const [img, setImg] = useState<ArrayBuffer>();
  const image = watch("image");

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
    const upload = await uploadcareClient
      .uploadFile(image)
      .then((file) => file.uuid)
      .catch((err) => console.log(err));

    if (!upload) return;
    console.log(upload);
    const res = await axios.put("/api/user/me/edit/avatar", { value: upload });
    if (res.status !== 200) return;
    await dispatch(fetchCurrUserData());
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
      />
      <button className="bg-violet-200 w-fit self-center p-2 rounded-full">
        Dodaj zdjęcie profilowe
      </button>
    </form>
  );
};

export default AddPhotoForm;
