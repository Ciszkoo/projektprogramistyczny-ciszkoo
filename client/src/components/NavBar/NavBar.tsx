import React from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "../Button/Button";
import HomeButton from "./HomeButton";
import Search from "./Search";
import UserProfileButton from "./UserProfileButton";

const NavBar = () => {
  const { loading, isAuth, handleLogout } = useAuth();

  return (
    <nav className="z-50 bg-violet-500 h-12 flex-none flex items-center justify-between sticky top-0 shadow-lg">
      {!loading && isAuth && (
        <div className="flex">
          <HomeButton />
          <Search />
        </div>
      )}
      {!loading && isAuth && (
        <div className="flex">
          <UserProfileButton />
          <Button
            circle={false}
            lightness="400"
            customClass="mr-2"
            handleOnClick={handleLogout}
          >
            Wyloguj
          </Button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
