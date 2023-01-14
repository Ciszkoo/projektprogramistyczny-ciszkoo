import React from "react";
import { useAppSelector } from "../reducers/hooks";
import {
  selectIsCurrentUser,
  selectVisibleUser,
} from "../reducers/userReducer";
import UserDataField from "../components/UserEdit/UserDataField";
import SubPageHeader from "../components/SubPage/SubPageHeader";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import Button from "../components/Button/Button";

const UserInfoPage = () => {
  const user = useAppSelector(selectVisibleUser);
  const isCurr = useAppSelector(selectIsCurrentUser);

  const { logoutHandler } = useAuth();

  const handleDeleteUser = async () => {
    try {
      logoutHandler();
      await axios.delete("/api/user/me");
      console.log("Deleted");
    } catch (error) {
      error instanceof Error && error.message
        ? console.log(error.message)
        : console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white w-[80%] rounded-xl shadow-lg p-5">
      <SubPageHeader title="Informacje:" />
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
      {isCurr && (
        <Button
          filling="Usuń konto"
          lightness="200"
          handleOnClick={handleDeleteUser}
          customClass="w-fit self-center"
        />
      )}
    </div>
  );
};

export default UserInfoPage;
