import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
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

export default Layout;
