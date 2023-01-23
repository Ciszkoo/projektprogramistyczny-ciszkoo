import axios from "axios";
import React, { useState } from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectMyId, selectUser } from "../../reducers/userReducer";
// import { useUser } from "../../routes/UserRoute";
import Button from "../Button/Button";
import FriendLabel from "./FriendLabel";
import { FriendI } from "./FriendsSubPage";

interface FriendProps {
  friend: FriendI;
}

const Friend = (props: FriendProps) => {
  const [isFriend, setIsFriend] = useState<boolean>(true);

  const myId = useAppSelector(selectMyId)

  const user = useAppSelector(selectUser)

  const handleRemoveFriend = async () => {
    try {
      await axios.delete(`/api/friends/remove/${props.friend.id}`);
      setIsFriend(false);
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
        id={props.friend.id}
      />
      {isFriend && myId === user.id && (
        <Button
          circle={false}
          lightness="200"
          handleOnClick={handleRemoveFriend}
        >
          Usuń z grona znajomych
        </Button>
      )}
      {!isFriend && <p>Usunięto z grona znajomych</p>}
    </li>
  );
};

export default Friend;
