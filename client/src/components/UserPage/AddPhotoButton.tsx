import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import AddPhotoModal from "./AddPhotoModal";

const AddPhotoButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const portal = createPortal(
    <AddPhotoModal closeModalHandler={closeModalHandler} />,
    document.body
  );

  return (
    <>
      <div className="h-10 w-10 bg-violet-300 rounded-full flex items-center justify-center absolute bottom-0 right-0">
        <button onClick={openModalHandler}>
          <CameraIcon className="h-8 w-8" />
        </button>
        {/* <input type="file" id="file-upload" className="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700"/> */}
      </div>
      {showModal && portal}
    </>
  );
};

export default AddPhotoButton;
