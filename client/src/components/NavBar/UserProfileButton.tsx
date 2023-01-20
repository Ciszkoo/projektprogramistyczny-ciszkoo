import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks";
import { selectMe } from "../../reducers/userReducer";
import Button from "../Button/Button";

const UserProfileButton = () => {
  const user = useAppSelector(selectMe);

  return (
    <Link to={`/user/${user.id}`}>
      <Button circle={true} lightness="300" customClass="mr-2">
        <UserIcon className="h-6 w-6" />
      </Button>
    </Link>
  );
};

export default UserProfileButton;
