import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../reducers/hooks";
import {
  selectIsCurrentUser,
  selectVisibleUser,
} from "../reducers/userReducer";
import UserDataField from "../components/UserEdit/UserDataField";
import DeleteUserButton from "../components/UserEdit/DeleteUserButton";

const UserInfoPage = () => {
  const user = useAppSelector(selectVisibleUser);
  const isCurr = useAppSelector(selectIsCurrentUser);

  return (
    <div className="flex flex-col m-16 gap-2">
      <div className="flex justify-between">
        <div className="text-4xl font-bold">Informacje:</div>
        <div className="h-10 w-24 flex items-center justify-center rounded-full bg-violet-200">
          <Link to={`/user/${user.id}`}>&lt;&lt; Wróć</Link>
        </div>
      </div>
      <div className="flex flex-col text-lg mt-10">
        <UserDataField
          label="Imię"
          value={user.firstName}
          propName="firstName"
        />
        <UserDataField
          label="Nazwisko"
          value={user.lastName}
          propName="lastName"
        />
        <UserDataField label="E-mail" value={user.email} propName="email" />
        <UserDataField
          label="Data urodzenia"
          value={user.dateOfBirth}
          propName="dateOfBirth"
        />
        <UserDataField label="Płeć" value={user.gender} propName="gender" />
      </div>
      {isCurr && <DeleteUserButton />}
    </div>
  );
};

export default UserInfoPage;
