import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../reducers/hooks";
import {
  MyData,
  OtherUserData,
  selectIsMe,
  selectUser,
} from "../../reducers/userReducer";
import Card from "../Card/Card";
import SubPageHeader from "../SubPage/SubPageHeader";
import FriendsSubSelect from "./FriendsSubSelect";

interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const FriendsSubPage = () => {
  const [isMain, setIsMain] = useState<boolean>(true);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [invitations, setInvitations] = useState<Friend[]>([]);

  const isMe = useAppSelector(selectIsMe);
  const user = useAppSelector(selectUser);

  const handleFetchFriends = async (user: OtherUserData | MyData) => {
    try {
      const { data } = await axios.get<Friend[]>(`/api/friends/${user.id}`);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchInvitations = async () => {
    try {
      const { data } = await axios.get<Friend[]>(`/api/friends/invitations`);
      setInvitations(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchFriends(user);
  }, [user]);

  useEffect(() => {
    handleFetchInvitations();
  }, []);

  const handleSetMainCard = () => setIsMain(true);

  const handleSetInvitationsCard = () => setIsMain(false);

  return (
    <Card customClass="flex flex-col gap-5">
      <SubPageHeader title="Znajomi" />
      <div className="flex gap-10">
        {isMe && (
          <>
            <FriendsSubSelect
              isMain={isMain}
              handler={handleSetMainCard}
              filling="Lista znajomych"
            />
            <FriendsSubSelect
              isMain={!isMain}
              handler={handleSetInvitationsCard}
              filling="Zaproszenia do znajomych"
            />
          </>
        )}
      </div>
      {isMain && (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.firstName}</li>
          ))}
        </ul>
      )}
      {!isMain && (
        <ul>
          {invitations.map((friend) => (
            <li key={friend.id}>{friend.firstName}</li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default FriendsSubPage;
