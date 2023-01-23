import React, { useState } from "react";
import Post from "../Post/Post";
import {
  fetchMoreUserPosts,
  Post as PostI,
  selectUserPosts,
  selectUserPostsCount,
} from "../../reducers/postsReducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Card/Card";

interface PostsListProps {
  posts: PostI[];
}

const PostsList = (props: PostsListProps) => {
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
      {!isThereAnyPosts && (
        <Card customClass="flex justify-center">
          <p>Loading...</p>
        </Card>
      )}
      <div className="w-full">
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
      </div>
    </>
    // <ul className="w-full">
    //   {props.posts.map((s) => {
    //     return <Post key={s.postId} post={s} />;
    //   })}
    // </ul>
  );
};

export default PostsList;
