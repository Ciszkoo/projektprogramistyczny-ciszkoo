import React from "react";
import { useAuth } from "../../context/AuthProvider";

const LogoutButton = () => {
  const { logoutHandler } = useAuth();

  return (
    <button
      className="bg-violet-400 h-10 rounded-full w-24 mr-2"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
