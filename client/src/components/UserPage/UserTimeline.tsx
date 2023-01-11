import React from "react";
import PostStatusForm from "./PostStatusForm";

const UserTimeline = () => {
  return (
    <div className="p-5 flex flex-col items-center">
      <div className="w-[80%] border-2 border-solid border-violet-100 rounded-xl p-5 flex flex-col gap-2">
        <PostStatusForm />
      </div>
    </div>
  );
};

export default UserTimeline;