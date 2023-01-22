import React from "react";

interface FriendLabelProps {
  firstName: string;
  lastName: string;
  avatar: string;
}

const FriendLabel = (props: FriendLabelProps) => {
  return (
    <div className="flex items-center gap-5">
      <img
        src={`${props.avatar}/-/scale_crop/100x100/`}
        className="rounded-full"
      />
      <p className="text-xl font-bold">
        {props.firstName} {props.lastName}
      </p>
    </div>
  );
};

export default FriendLabel;
