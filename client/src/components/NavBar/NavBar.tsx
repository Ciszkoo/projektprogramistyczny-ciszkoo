import React from "react";
import { useAuth } from "../../context/AuthProvider";
import HomeButton from "./HomeButton";
import LogoutButton from "./LogoutButton";
import Search from "./Search";
import UserProfileButton from "./UserProfileButton";

const NavBar = () => {
  const { isAuth } = useAuth();

  return (
    <nav className="bg-violet-500 h-12 flex-initial flex items-center justify-between">
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
