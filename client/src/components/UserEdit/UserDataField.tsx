import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../reducers/hooks";
import { selectMyId } from "../../reducers/userReducer";
import { useParams } from "react-router";
import { useModal } from "../Modal/Modal";
import EditForm from "./EditForm";

interface UserDataFieldProps {
  label: string;
  value: string | undefined;
  propName: "firstName" | "lastName" | "email" | "dateOfBirth" | "gender";
}

const UserDataField = (props: UserDataFieldProps) => {
  const { id } = useParams();
  const myId = useAppSelector(selectMyId);

  const { openModal, modalPortal } = useModal(
    <EditForm propName={props.propName} label={props.label} />
  );

  return (
    <div className="my-4 flex justify-between w-[70%]">
      <p>
        {props.label}: {props.value}
      </p>
      {id === myId && (
        <button onClick={openModal}>
          <PencilSquareIcon className="w-6 h-6" />
        </button>
      )}
      {modalPortal}
    </div>
  );
};

export default UserDataField;
