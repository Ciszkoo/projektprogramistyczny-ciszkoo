import React from "react";
import { useAuth } from "../../context/AuthProvider";
import Search from "./Search";

const NavBar = () => {
  const { isAuth } = useAuth();

  return (
    <nav className="bg-blue-400 h-12 flex-initial flex items-center">
      {isAuth && <Search />}
    </nav>
  );
};

export default NavBar;
