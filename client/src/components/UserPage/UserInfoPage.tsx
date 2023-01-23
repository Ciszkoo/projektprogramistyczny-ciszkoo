import React from "react";
import { useAppSelector } from "../../reducers/hooks";
import SubPageHeader from "../SubPage/SubPageHeader";
import UserDataField from "../UserEdit/UserDataField";
import { selectUser } from "../../reducers/userReducer";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import Button from "../Button/Button";

const UserInfoPage = () => {
  const user = useAppSelector(selectUser);

  const { handleLogout } = useAuth();

  const handleDeleteUser = async () => {
    try {
      handleLogout();
      await axios.delete("/api/user");
      console.log("Deleted");
    } catch (error) {
      console.log(error);

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
      {user.friendship === "me" && (
        <Button
          circle={false}
          lightness="200"
          handleOnClick={handleDeleteUser}
          customClass="w-fit self-center"
        >
          Usuń konto
        </Button>
      )}
    </div>
  );
};

export default UserInfoPage;
