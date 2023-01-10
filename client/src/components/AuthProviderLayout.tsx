import { Outlet, useLoaderData } from "react-router";
import AuthProvider from "../context/AuthProvider";
import NavBar from "./NavBar/NavBar";

const AuthProviderLayout = () => {
  const loaderData = useLoaderData();

  return (
    <AuthProvider>
      <NavBar />
      <div className="flex-auto bg-violet-100 flex">
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default AuthProviderLayout;
