import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserCard from "../components/UserPage/UserCard";
import UserTimeline from "../components/UserPage/UserTimeline";
import { useAppSelector } from "../reducers/hooks";
import { selectUser } from "../reducers/userReducer";

const UserPage = () => {
  const [main, setMain] = useState<boolean>(true);

  const user = useAppSelector(selectUser);

  const location = useLocation();

  const mainHandler = () => {
    setMain(false);
  };

  useEffect(() => {
    if (location.pathname === `/user/${user.data.id}`) {
      setMain(true);
    }
  }, [location, user.data.id]);

  return (
    <div className="w-[80%] flex flex-col h-full mx-auto flex-initial py-2">
      <UserCard mainHandler={mainHandler} />
      <div className="rounded-xl bg-white flex-initial">
        {main && <UserTimeline />}
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
