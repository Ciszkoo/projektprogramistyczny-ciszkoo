import React, { useState } from "react";
import Button from "../Button/Button";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../reducers/hooks";
import {
  selectIsCurrentUser,
  selectVisibleUser,
} from "../../reducers/userReducer";
import axios from "axios";

type InvitationState = "invited" | "notInvited" | "pending" | "friend";

const InvitationButton = () => {
  // const isCurrent = useAppSelector(selectIsCurrentUser);
  const user = useAppSelector(selectVisibleUser);

  const [invitationState, setInvitationState] =
    useState<InvitationState>("notInvited");

  const handleInvite = async () => {
    try {
      const res = await axios.post(`/api/friends/invite/${user.id}`);
      setInvitationState("invited");
      console.log("invite");
    } catch (error) {
      console.log("Could not invite user");
    }
  };

  const handleCancel = () => {
    console.log("cancel");
    setInvitationState("notInvited");
  };

  return (
    <>
      {invitationState === "notInvited" && (
        <Button
          filling="Zaproś"
          lightness="200"
          handleOnClick={handleInvite}
          customClass="mb-3 self-end"
        />
      )}
      {invitationState === "invited" && (
        <Button
          filling="Anuluj zaproszenie"
          lightness="200"
          handleOnClick={handleCancel}
          customClass="mb-3 self-end"
        />
      )}
      {invitationState === "friend" && (
        <Button filling="Znajomy" lightness="100" customClass="mb-3 self-end" />
      )}
    </>
  );
};

export default InvitationButton;
