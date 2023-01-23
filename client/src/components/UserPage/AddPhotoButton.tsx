import React from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useModal } from "../Modal/Modal";
import AddPhotoForm from "./AddPhotoForm";
import Button from "../Button/Button";

const AddPhotoButton = () => {
  const { openModal, modalPortal } = useModal(<AddPhotoForm />);

  return (
    <>
      <Button
        circle={true}
        lightness="300"
        customClass="absolute bottom-0 right-0"
        handleOnClick={openModal}
      >
        <CameraIcon className="h-8 w-8" />
      </Button>
      {modalPortal}
    </>
  );
};

export default AddPhotoButton;
