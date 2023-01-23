import { Outlet } from "react-router";
import NavBar from "./NavBar/NavBar";
import ScrollToTop from "./ScrollToTop";

const AuthProviderLayout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <div className="flex-auto bg-violet-100 flex">
        <div className="w-[60%] flex flex-col mx-auto py-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthProviderLayout;
