import React from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../Button/Button";

interface SubPageHeaderProps {
  title: string;
}

const SubPageHeader = (props: SubPageHeaderProps) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/user/" + id);
  };

  return (
    <div className="flex justify-between">
      <div className="text-4xl font-bold">{props.title}</div>
      <Button circle={false} lightness="200" handleOnClick={handleOnClick}>
        &lt;&lt; Wróć
      </Button>
    </div>
  );
};

export default SubPageHeader;
