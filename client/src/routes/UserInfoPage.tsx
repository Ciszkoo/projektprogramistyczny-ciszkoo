import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../reducers/hooks";
import { selectUser } from "../reducers/userReducer";
import UserDataField from "../components/UserEdit/UserDataField";

const UserInfoPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-col m-20">
      <div className="flex justify-between">
        <div className="text-4xl font-bold">Informacje:</div>
        <div className="h-10 w-24 flex items-center justify-center rounded-full bg-violet-200">
          <Link to={`/user/${user.data.email}`}>&lt;&lt; Wróć</Link>
        </div>
      </div>
      {/* <EditForm /> */}
      <div className="flex flex-col text-lg mt-10">
        <UserDataField label="Imię" value={user.data.name} />
        <UserDataField label="Nazwisko" value={user.data.surname} />
        <UserDataField label="E-mail" value={user.data.email} />
        <UserDataField label="Data urodzenia" value={user.data.dateOfBirth} />
        <UserDataField label="Płeć" value={user.data.gender} />
      </div>
    </div>
  );
};

export default UserInfoPage;
