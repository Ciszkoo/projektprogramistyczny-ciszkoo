import axios from "axios";
import React, { useState } from "react";
import Button from "../Button/Button";
import FriendLabel from "./FriendLabel";
import { FriendI } from "./FriendsSubPage";

interface FriendProps {
  friend: FriendI;
}

const InvitingFriend = (props: FriendProps) => {
  const [isInvitation, setIsInvitation] = useState<boolean>(true);
  const [isFriend, setIsFriend] = useState<boolean>();

  const handleAcceptFriend = async () => {
    try {
      await axios.post(`/api/friends/accept/${props.friend.id}`);
      setIsFriend(true);
      setIsInvitation(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineFriend = async () => {
    try {
      await axios.delete(`/api/friends/delete/${props.friend.id}`);
      setIsFriend(false);
      setIsInvitation(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="flex items-center justify-between hover:bg-violet-50 p-5 rounded-full">
      <FriendLabel
        firstName={props.friend.firstName}
        lastName={props.friend.lastName}
        avatar={props.friend.avatar}
      />
      {isInvitation && (
        <div className="flex gap-2">
          <Button
            circle={false}
            lightness="200"
            handleOnClick={handleAcceptFriend}
          >
            Akceptuj
          </Button>
          <Button
            circle={false}
            lightness="200"
            handleOnClick={handleDeclineFriend}
          >
            Odrzuć
          </Button>
        </div>
      )}
      {!isInvitation && (
        <>
          {isFriend && <p>Zaproszenie zaakceptowane</p>}
          {!isFriend && <p>Zaproszenie odrzucone</p>}
        </>
      )}
    </li>
  );
};

export default InvitingFriend;
