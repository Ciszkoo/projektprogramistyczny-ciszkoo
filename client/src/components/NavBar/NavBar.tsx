import React from "react";
import { useAuth } from "../../context/AuthProvider";
import LogoutButton from "./LogoutButton";
import Search from "./Search";

const NavBar = () => {
  const { isAuth } = useAuth();

  return (
    <nav className="bg-blue-400 h-12 flex-initial flex items-center justify-between">
      {isAuth && <Search />}
      {isAuth && <LogoutButton />}
    </nav>
  );
};

export default NavBar;
