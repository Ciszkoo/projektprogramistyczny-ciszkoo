import React from "react";

interface FriendsSubSelectProps {
  isMain: boolean;
  handler: () => void;
  filling: string;
}

const FriendsSubSelect = (props: FriendsSubSelectProps) => {
  return (
    <button
      className={
        props.isMain ? "bg-violet-50 rounded-xl p-2" : "rounded-xl p-2"
      }
      onClick={props.handler}
    >
      {props.filling}
    </button>
  );
};

export default FriendsSubSelect;
