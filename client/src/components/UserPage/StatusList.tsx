import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectUserPosts } from "../../reducers/userPostsReducer";

type Status = {
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
    <ul>
      {posts.map((s) => {
        return (
          <li key={s.id}>
            <p>
              {s.firstName} {s.lastName} {s.at}
            </p>
            <p>{s.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default StatusList;
