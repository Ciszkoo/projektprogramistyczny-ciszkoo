import React from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to={`/`}>
      <div className="bg-violet-400 h-10 w-10 rounded-full flex items-center justify-center ml-2">
        <HomeIcon className="h-6 w-6" />
      </div>
    </Link>
  );
};

export default HomeButton;
