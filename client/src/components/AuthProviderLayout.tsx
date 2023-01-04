import { Outlet } from "react-router";
import AuthProvider from "../context/AuthProvider";
import NavBar from "./NavBar/NavBar";

const AuthProviderLayout = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Outlet />
    </AuthProvider>
  );
};

export default AuthProviderLayout;