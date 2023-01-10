import React from "react";
import { useAuth } from "../../context/AuthProvider";
import HomeButton from "./HomeButton";
import LogoutButton from "./LogoutButton";
import Search from "./Search";
import UserProfileButton from "./UserProfileButton";

const NavBar = () => {
  const { isAuth } = useAuth();

  return (
    <nav className="z-50 bg-violet-500 h-12 flex-none flex items-center justify-between sticky top-0">
      {isAuth && (
        <div className="flex">
          <HomeButton />
          <Search />
        </div>
      )}
      {isAuth && (
        <div className="flex">
          <UserProfileButton />
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
