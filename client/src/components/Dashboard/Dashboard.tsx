import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import {
  fetchMoreFriendsPosts,
  selectFriendsPosts,
  selectFriendsPostsCount,
} from "../../reducers/postsReducer";
import Card from "../Card/Card";
import Post from "../Post/Post";

const Dashboard = () => {
  const [page, setPage] = useState<number>(1);

  const posts = useAppSelector(selectFriendsPosts);

  const isThereAnyPosts = posts.length > 0;

  const dispatch = useAppDispatch();

  const count = useAppSelector(selectFriendsPostsCount);

  const loadMorePosts = async () => {
    await dispatch(fetchMoreFriendsPosts(page));
    setPage(() => page + 1);
  };

  return (
    <>
      {!isThereAnyPosts && (
        <Card customClass="flex justify-center">
          <p>Loading...</p>
        </Card>
      )}
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={posts.length < count - 1}
        loader={
          <Card customClass="flex justify-center">
            <p>Loading...</p>
          </Card>
        }
      >
        {posts.map((post) => {
          return <Post key={post.postId} post={post} />;
        })}
      </InfiniteScroll>
    </>
  );
};

export default Dashboard;
