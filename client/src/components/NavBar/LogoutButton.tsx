import React from "react";
import { useAuth } from "../../context/AuthProvider";

const LogoutButton = () => {
  const { logoutHandler } = useAuth();

  return (
    <button
      className="bg-blue-300 h-10 mr-2 rounded-full w-24"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
