import React, { useState } from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectUserPosts } from "../../reducers/userPostsReducer";
import Post from "../Post/Post";

export type Status = {
  userId: string;
  firstName: string;
  lastName: string;
  at: number;
  id: string;
  content: string;
};

const StatusList = () => {
  const [page, setPage] = useState<number>(0);
  const [statuses, setStatuses] = useState<Status[]>([]);

  const posts = useAppSelector(selectUserPosts);

  return (
    <ul className="w-[80%]">
      {posts.map((s) => {
        return <Post key={s.id} post={s} />;
      })}
    </ul>
  );
};

export default StatusList;
