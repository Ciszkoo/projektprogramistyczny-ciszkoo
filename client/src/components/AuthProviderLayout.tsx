import { Outlet, useLoaderData, useRouteLoaderData } from "react-router";
import AuthProvider from "../context/AuthProvider";
import NavBar from "./NavBar/NavBar";

const AuthProviderLayout = () => {
  // const loaderData = useRouteLoaderData("auth");
  // console.log(loaderData);

  return (
    // <AuthProvider>
    <>
      <NavBar />
      <div className="flex-auto bg-violet-100 flex">
        <Outlet />
      </div>
    </>
    // </AuthProvider>
  );
};

export default AuthProviderLayout;
