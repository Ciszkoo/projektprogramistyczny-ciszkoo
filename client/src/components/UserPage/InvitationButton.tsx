import React from "react";
import Button from "../Button/Button";

import axios from "axios";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchUserData, selectUser } from "../../reducers/userReducer";

const InvitationButton = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleInvite = async () => {
    try {
      await axios.post(`/api/friends/invite/${user.id}`);
      dispatch(fetchUserData(user.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.delete(`/api/friends/cancel/${user.id}`);
      dispatch(fetchUserData(user.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      await axios.post(`/api/friends/accept/${user.id}`);
      dispatch(fetchUserData(user.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.delete(`/api/friends/decline/${user.id}`);
      dispatch(fetchUserData(user.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await axios.delete(`/api/friends/remove/${user.id}`);
      dispatch(fetchUserData(user.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user.friendship === "none" && (
        <Button
          circle={true}
          handleOnClick={handleInvite}
          lightness="200"
          customClass="mb-3 self-end"
        >
          <UserPlusIcon className="h-6 w-6" />
        </Button>
      )}
      {user.friendship === "invited" && (
        <Button
          circle={false}
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
            circle={false}
            lightness="200"
            customClass="mb-3 self-end"
            handleOnClick={handleAccept}
          >
            Akceptuj zaproszenie
          </Button>
          <Button
            circle={false}
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
          circle={false}
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
