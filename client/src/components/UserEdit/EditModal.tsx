import React from "react";

interface EditModalProps {
  closeModalHandler: () => void;
}

const EditModal = (props: EditModalProps) => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-400 absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 opacity-50"></div>
      <div className="absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 bg-white">
        Modal
        <button onClick={props.closeModalHandler}>Zamknij</button>
      </div>
    </>
  );
};

export default EditModal;
