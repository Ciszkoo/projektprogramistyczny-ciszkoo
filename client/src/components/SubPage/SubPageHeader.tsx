import React from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/userReducer";
import Button from "../Button/Button";

interface SubPageHeaderProps {
  title: string;
}

const SubPageHeader = (props: SubPageHeaderProps) => {
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <div className="flex justify-between">
      <div className="text-4xl font-bold">{props.title}</div>
      <Button
        lightness="200"
        handleOnClick={handleOnClick}
      >&lt;&lt; Wróć</Button>
    </div>
  );
};

export default SubPageHeader;
