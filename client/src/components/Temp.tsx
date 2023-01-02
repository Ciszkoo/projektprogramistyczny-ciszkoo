import React from "react";
import { useAppSelector } from "../reducers/hooks";
import { selectUser } from "../reducers/userReducer";
const Temp = () => {
  const user = useAppSelector(selectUser);

  return <div>{JSON.stringify(user.data)}</div>;
};

export default Temp;
