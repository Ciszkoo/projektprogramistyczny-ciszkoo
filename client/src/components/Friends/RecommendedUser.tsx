import axios from "axios";
import React from "react";
import Button from "../Button/Button";
import FriendLabel from "./FriendLabel";
import { FriendI } from "./FriendsSubPage";

interface FriendProps {
  user: FriendI;
}

const RecommendedUser = (props: FriendProps) => {
  const [invited, setInvited] = React.useState<boolean>(false);

  const handleInviteFriend = async () => {
    try {
      await axios.post(`/api/friends/invite/${props.user.id}`);
      setInvited(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelInvitation = async () => {
    try {
      await axios.delete(`/api/friends/cancel/${props.user.id}`);
      setInvited(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="flex items-center justify-between hover:bg-violet-50 p-5 rounded-full">
      <FriendLabel
        firstName={props.user.firstName}
        lastName={props.user.lastName}
        avatar={props.user.avatar}
        id={props.user.id}
      />
      {!invited && (
        <Button
          circle={false}
          lightness="200"
          handleOnClick={handleInviteFriend}
        >
          Zaproś
        </Button>
      )}
      {invited && (
        <Button
          circle={false}
          lightness="200"
          handleOnClick={handleCancelInvitation}
        >
          Cofnij
        </Button>
      )}
    </li>
  );
};

export default RecommendedUser;
