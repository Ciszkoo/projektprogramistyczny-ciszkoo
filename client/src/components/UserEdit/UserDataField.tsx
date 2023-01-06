import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/userReducer";
import EditModal from "./EditModal";

interface UserDataFieldProps {
  label: string;
  value: string | undefined;
}

const UserDataField = (props: UserDataFieldProps) => {
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="my-4 flex justify-between w-[70%]">
      <p>
        {props.label}: {props.value}
      </p>
      <button onClick={() => setShowModal(true)}>
        <PencilSquareIcon className="w-6 h-6" />
      </button>
      {showModal &&
        createPortal(
          <EditModal closeModalHandler={closeModalHandler} />,
          document.body
        )}
    </div>
  );
};

export default UserDataField;
