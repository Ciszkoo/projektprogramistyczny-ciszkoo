import React from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectIsMe } from "../../reducers/userReducer";
import PostStatusForm from "./PostStatusForm";
import StatusList from "./StatusList";

const UserTimeline = () => {
  const isCurr = useAppSelector(selectIsMe);

  return (
    <>
      {isCurr && (
        <div className="w-[80%] bg-white shadow-lg rounded-xl p-5 flex flex-col gap-2">
          <PostStatusForm />
        </div>
      )}
      <StatusList />
    </>
  );
};

export default UserTimeline;
