import axios from "axios";
import React from "react";
import { useAuth } from "../../context/AuthProvider";

const DeleteUserButton = () => {
  const { logoutHandler } = useAuth();

  const deleteUserHandler = async () => {
    try {
      logoutHandler();
      await axios.delete("http://localhost:5000/api/users/me");
      console.log("Deleted");
    } catch (error) {
      error instanceof Error && error.message
        ? console.log(error.message)
        : console.log(error);
    }
  };

  return (
    <button
      onClick={deleteUserHandler}
      className="self-center w-fit p-2 bg-violet-200 rounded-full"
    >
      Usuń konto
    </button>
  );
};

export default DeleteUserButton;
