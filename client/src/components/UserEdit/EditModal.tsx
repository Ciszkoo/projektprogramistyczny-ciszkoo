import React from "react";
import EditForm from "./EditForm";

interface EditModalProps {
  closeModalHandler: () => void;
  label: string;
  propName: "firstName" | "lastName" | "email" | "dateOfBirth" | "gender";
}

const EditModal = (props: EditModalProps) => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-400 absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 opacity-50"></div>
      <div className="absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 bg-white flex flex-col p-10 rounded-xl text-lg gap-2">
        <p className="font-bold">{props.label}:</p>
        <EditForm label={props.label} propName={props.propName} />
        <button
          className="w-min self-center p-2 bg-violet-200 rounded-full"
          onClick={props.closeModalHandler}
        >
          Zamknij
        </button>
      </div>
    </>
  );
};

export default EditModal;
