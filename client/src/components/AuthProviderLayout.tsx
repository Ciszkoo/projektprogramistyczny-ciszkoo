import { Outlet } from "react-router";
import AuthProvider from "../context/AuthProvider";

const AuthProviderLayout = () => {
  return (
    <AuthProvider>
      <nav className="bg-blue-400 h-12 flex-initial"></nav>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthProviderLayout;