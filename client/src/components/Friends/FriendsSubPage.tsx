import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectMyId, selectUser } from "../../reducers/userReducer";
import Card from "../Card/Card";
import SubPageHeader from "../SubPage/SubPageHeader";
import Friend from "./Friend";
import FriendsSubSelect from "./FriendsSubSelect";
import InvitingFriend from "./InvitingFriend";

export interface FriendI {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const FriendsSubPage = () => {
  const [isMain, setIsMain] = useState<boolean>(true);
  const [friends, setFriends] = useState<FriendI[]>([]);
  const [invitations, setInvitations] = useState<FriendI[]>([]);

  const myId = useAppSelector(selectMyId);

  const user = useAppSelector(selectUser);

  const handleFetchFriends = async (id: string) => {
    try {
      const { data } = await axios.get<FriendI[]>(`/api/friends/${id}`);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchInvitations = async () => {
    try {
      const { data } = await axios.get<FriendI[]>(`/api/friends/invitations`);
      setInvitations(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchFriends(user.id);
    // eslint-disable-next-line
  }, [isMain]);

  useEffect(() => {
    handleFetchInvitations();
  }, [isMain]);

  const handleSetMainCard = () => setIsMain(true);

  const handleSetInvitationsCard = () => setIsMain(false);

  return (
    <Card customClass="flex flex-col gap-5 w-[80%]">
      <SubPageHeader title="Znajomi" />
      <div className="flex gap-10">
        {user.id === myId && (
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
            <Friend key={friend.id} friend={friend} />
          ))}
        </ul>
      )}
      {!isMain && (
        <ul>
          {invitations.map((friend) => (
            <InvitingFriend key={friend.id} friend={friend} />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default FriendsSubPage;
