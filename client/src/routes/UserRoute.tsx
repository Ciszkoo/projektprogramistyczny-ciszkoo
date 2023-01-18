import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/UserPage/UserPage";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { selectMe, setMe, setOtherUser } from "../reducers/userReducer";

const UserRoute = () => {
  const user = useAppSelector(selectMe);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const condition = id === user.id;

  useLayoutEffect(() => {
    condition ? dispatch(setMe()) : dispatch(setOtherUser());
  }, [condition, dispatch]);

  return <UserPage />;
};

export default UserRoute;
