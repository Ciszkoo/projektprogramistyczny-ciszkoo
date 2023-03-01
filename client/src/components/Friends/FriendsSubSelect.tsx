import React, { PropsWithChildren } from "react";

interface FriendsSubSelectProps {
  isMain: boolean;
  handler: () => void;
}

const FriendsSubSelect = (props: PropsWithChildren<FriendsSubSelectProps>) => {
  return (
    <button
      className={
        props.isMain
          ? "bg-violet-50 rounded-xl p-2"
          : "rounded-xl p-2 hover:bg-violet-50"
      }
      onClick={props.handler}
    >
      {props.children}
    </button>
  );
};

export default FriendsSubSelect;
