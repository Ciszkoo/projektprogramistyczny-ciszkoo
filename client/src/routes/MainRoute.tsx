import { useState } from "react";
import { Navigate } from "react-router";
import { LoadingCard } from "../components/Card/Card";
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
      {loading && <LoadingCard />}
      {!loading && (
        <>
          {!isAuth && (
            <>
              {!isRegister && <LoginForm setIsRegister={handleSignUp} />}
              {isRegister && <RegisterForm setIsRegister={handleCloseSignUp} />}
            </>
          )}
          {isAuth && <Navigate to="/dashboard" replace />}
          {isAuth && <LoadingCard />}
        </>
      )}
    </>
  );
};

export default MainRoute;
