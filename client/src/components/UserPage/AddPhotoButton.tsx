import React from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useModal } from "../Modal/Modal";
import AddPhotoForm from "./AddPhotoForm";

const AddPhotoButton = () => {
  const { openModal, modalPortal } = useModal(<AddPhotoForm />);

  return (
    <>
      <div className="h-10 w-10 bg-violet-300 rounded-full flex items-center justify-center absolute bottom-0 right-0">
        <button onClick={openModal}>
          <CameraIcon className="h-8 w-8" />
        </button>
      </div>
      {modalPortal}
    </>
  );
};

export default AddPhotoButton;
