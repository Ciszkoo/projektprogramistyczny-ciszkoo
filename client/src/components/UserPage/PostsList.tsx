import React, { useState } from "react";
import Post from "../Post/Post";
import {
  fetchMoreUserPosts,
  selectUserPosts,
  selectUserPostsCount,
} from "../../reducers/postsReducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingCard } from "../Card/Card";

const PostsList = () => {
  const [page, setPage] = useState<number>(1);

  const { id } = useParams();
  const posts = useAppSelector(selectUserPosts);
  const isThereAnyPosts = posts.length > 0;
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectUserPostsCount);

  const loadMorePosts = async () => {
    typeof id !== "undefined" &&
      (await dispatch(fetchMoreUserPosts({ id, page })));
    setPage(() => page + 1);
  };

  return (
    <>
      {!isThereAnyPosts && <LoadingCard />}
      <div className="w-full">
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={posts.length < count - 1}
          loader={<LoadingCard />}
        >
          {posts.map((post) => {
            return <Post key={post.postId} post={post} />;
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PostsList;
