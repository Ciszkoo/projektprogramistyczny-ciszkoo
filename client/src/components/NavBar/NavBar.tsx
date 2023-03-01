import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import { useAppSelector } from "../../reducers/hooks";
import { selectMyId } from "../../reducers/userReducer";
import Button from "../Button/Button";
import Search from "./Search";

const NavBar = () => {
  const { loading, isAuth, handleLogout } = useAuth();

  const myId = useAppSelector(selectMyId);

  const navigate = useNavigate();

  const handleMyProfile = async () => {
    navigate(`/user/${myId}`);
  };

  const handleHome = () => {
    navigate(`/dashboard`);
  };

  return (
    <nav className="z-30 bg-violet-500 h-12 flex-none flex items-center justify-between sticky top-0 shadow-lg">
      {!loading && isAuth && (
        <div className="flex">
          <Button
            circle={true}
            lightness="300"
            customClass="ml-2"
            handleOnClick={handleHome}
          >
            <HomeIcon className="h-6 w-6" />
          </Button>
          <Search />
        </div>
      )}
      {!loading && isAuth && (
        <div className="flex">
          <Button
            circle={true}
            lightness="300"
            customClass="mr-2"
            handleOnClick={handleMyProfile}
          >
            <UserIcon className="h-6 w-6" />
          </Button>
          <Button
            circle={false}
            lightness="300"
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
