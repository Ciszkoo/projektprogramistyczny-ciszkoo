import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthProvider";

const MainRoute = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const { isAuth, loading } = useAuth();

  const handleSignUp = () => {
    setIsRegister(true);
  };

  const handleCloseSignUp = () => {
    setIsRegister(false);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {!isAuth && (
            <>
              {!isRegister && <LoginForm setIsRegister={handleSignUp} />}
              {isRegister && <RegisterForm setIsRegister={handleCloseSignUp} />}
            </>
          )}
          {isAuth && <Dashboard />}
        </>
      )}
    </>
  );
};

export default MainRoute;
