import React from "react";
import { useNavigate } from "react-router";

interface FriendLabelProps {
  firstName: string;
  lastName: string;
  avatar: string;
  id: string;
}

const FriendLabel = (props: FriendLabelProps) => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(`/user/${props.id}`)
  }

  return (
    <div className="flex items-center gap-5 hover:cursor-pointer" onClick={handleNavigation}>
      <img
        src={`${props.avatar}/-/scale_crop/100x100/`}
        className="rounded-full"
        alt="avatar"
      />
      <p className="text-xl font-bold">
        {props.firstName} {props.lastName}
      </p>
    </div>
  );
};

export default FriendLabel;
