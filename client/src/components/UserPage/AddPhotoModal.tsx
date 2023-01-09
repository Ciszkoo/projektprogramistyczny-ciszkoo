import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AddPhotoForm from "./AddPhotoForm";

interface AddPhotoModalProps {
  closeModalHandler: () => void;
}

const AddPhotoModal = (props: AddPhotoModalProps) => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-400 absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 opacity-50"></div>
      <div className="absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 bg-white p-12 rounded-xl">
        <button
          className="h-8 w-8 bg-violet-200 rounded-full flex items-center justify-center absolute top-2 right-2"
          onClick={props.closeModalHandler}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <AddPhotoForm />
      </div>
    </>
  );
};

export default AddPhotoModal;
