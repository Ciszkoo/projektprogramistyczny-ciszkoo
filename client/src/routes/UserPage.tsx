import React from "react";
import Temp from "../components/Temp";
import { useAppSelector } from "../reducers/hooks";
import { selectUser } from "../reducers/userReducer";

const UserPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex-auto bg-slate-200">
      <div className="flex items-center p-5">
        <div className="bg-white w-36 h-36 rounded-full"></div>
        <p className="text-4xl font-bold text-center mt-20">{user.data.name} {user.data.surname}</p>
      </div>
      <Temp />
    </div>
  );
};

export default UserPage;
