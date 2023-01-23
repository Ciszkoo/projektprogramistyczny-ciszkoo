import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { fetchFriendsPosts, fetchUserPosts } from "../../reducers/postsReducer";
import { selectMyId } from "../../reducers/userReducer";
import Button from "../Button/Button";

interface DeletePostModalProps {
  postId: string;
}

const DeletePostModal = (props: DeletePostModalProps) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const myId = useAppSelector(selectMyId);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/api/posts/${props.postId}`);
      setIsDeleted(true);
      await dispatch(fetchUserPosts({ id: myId, page: 0 }));
      dispatch(fetchFriendsPosts(0));
      document.body.style.overflow = "unset"
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <div className="flex flex-col gap-2">
          <p>Na pewno chcesz usunąć ten post?</p>
          <Button
            lightness="200"
            circle={false}
            handleOnClick={handleDeletePost}
          >
            Usuń
          </Button>
        </div>
  );
};

export default DeletePostModal;
