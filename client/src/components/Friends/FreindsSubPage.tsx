import React, { useState } from "react";
import Card from "../Card/Card";
import SubPageHeader from "../SubPage/SubPageHeader";
import FriendsSubSelect from "./FriendsSubSelect";

const FriendsSubPage = () => {
  const [isMain, setIsMain] = useState(true);
  
  const handleSetMainCard = () => setIsMain(true);

  const handleSetInvitationsCard = () => setIsMain(false);

  return (
    <Card customClass="flex flex-col gap-5">
      <SubPageHeader title="Znajomi" />
      <div className="flex gap-10">
        <FriendsSubSelect isMain={isMain} handler={handleSetMainCard} filling="Lista znajomych"/>
        <FriendsSubSelect isMain={!isMain} handler={handleSetInvitationsCard} filling="Zaproszenia do znajomych"/>
      </div>
      {isMain ? <div>Lista znajomych</div> : <div>Zaproszenia do znajomych</div>}
    </Card>
  );
};

export default FriendsSubPage;
