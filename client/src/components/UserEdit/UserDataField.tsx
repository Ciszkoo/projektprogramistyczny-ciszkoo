import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import EditModal from "./EditModal";
import { useAppSelector } from "../../reducers/hooks";
import { selectMyId } from "../../reducers/userReducer";
import { useParams } from "react-router";

interface UserDataFieldProps {
  label: string;
  value: string | undefined;
  propName: "firstName" | "lastName" | "email" | "dateOfBirth" | "gender";
}

const UserDataField = (props: UserDataFieldProps) => {
  const [showModal, setShowModal] = useState(false);

  const {id} = useParams()
  const myId = useAppSelector(selectMyId);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const portal = createPortal(
    <EditModal
      closeModalHandler={closeModalHandler}
      label={props.label}
      propName={props.propName}
    />,
    document.body
  );

  return (
    <div className="my-4 flex justify-between w-[70%]">
      <p>
        {props.label}: {props.value}
      </p>
      {id === myId && (
        <button onClick={openModalHandler}>
          <PencilSquareIcon className="w-6 h-6" />
        </button>
      )}
      {showModal && portal}
    </div>
  );
};

export default UserDataField;
