import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import UserPage from "../components/UserPage/UserPage";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { selectCurrUser, setCurr, setOther } from "../reducers/userReducer";

const UserRoute = () => {
  const user = useAppSelector(selectCurrUser);

  const location = useLocation();

  const dispatch = useAppDispatch();

  const condition = location.pathname.includes(user.id as string);

  useLayoutEffect(() => {
    condition ? dispatch(setCurr()) : dispatch(setOther());
  }, [condition, dispatch]);

  return <UserPage />;
};

export default UserRoute;
