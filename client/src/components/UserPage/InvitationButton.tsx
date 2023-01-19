import React, { useState } from "react";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import {
  fetchFriendshipStatus,
  selectOtherUser,
} from "../../reducers/userReducer";
import axios from "axios";
import { UserPlusIcon } from "@heroicons/react/24/outline";

type InvitationState = "none" | "invited" | "invitation" | "friends";

const InvitationButton = () => {
  const user = useAppSelector(selectOtherUser);

  const dispatch = useAppDispatch();

  const handleInvite = async () => {
    try {
      await axios.post(`/api/friends/invite/${user.id}`);
      typeof user.id === "string" &&
        (await dispatch(fetchFriendshipStatus(user.id)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.delete(`/api/friends/cancel/${user.id}`);
      typeof user.id === "string" &&
        (await dispatch(fetchFriendshipStatus(user.id)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      await axios.post(`/api/friends/accept/${user.id}`);
      typeof user.id === "string" &&
        (await dispatch(fetchFriendshipStatus(user.id)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.delete(`/api/friends/decline/${user.id}`);
      typeof user.id === "string" &&
        (await dispatch(fetchFriendshipStatus(user.id)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await axios.delete(`/api/friends/remove/${user.id}`);
      typeof user.id === "string" &&
        (await dispatch(fetchFriendshipStatus(user.id)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user.friendship === "none" && (
        <Button
          handleOnClick={handleInvite}
          lightness="200"
          customClass="mb-3 self-end"
        >
          <UserPlusIcon className="h-6 w-6" />
        </Button>
      )}
      {user.friendship === "invited" && (
        <Button
          handleOnClick={handleCancel}
          lightness="200"
          customClass="mb-3 self-end"
        >
          Anuluj zaproszenie
        </Button>
      )}
      {user.friendship === "invitation" && (
        <>
          <Button
            lightness="200"
            customClass="mb-3 self-end"
            handleOnClick={handleAccept}
          >
            Akceptuj zaproszenie
          </Button>
          <Button
            lightness="200"
            customClass="mb-3 self-end"
            handleOnClick={handleDecline}
          >
            Odrzuć zaproszenie
          </Button>
        </>
      )}
      {user.friendship === "friends" && (
        <Button
          lightness="200"
          customClass="mb-3 self-end"
          handleOnClick={handleRemoveFriend}
        >
          Usuń z grona znajomych
        </Button>
      )}
    </>
  );
};

export default InvitationButton;
