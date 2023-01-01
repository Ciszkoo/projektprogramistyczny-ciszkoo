import { useEffect, useState } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isAuthWrap, setIsAuthWrap] = useState<boolean>(false);

  const { isAuth } = useAuth();

  useEffect(() => {
    setIsAuthWrap(isAuth);
  }, [isAuth]);

  const handleSignUp = () => {
    setIsRegister(true);
  };

  const handleCloseSignUp = () => {
    setIsRegister(false);
  };

  return (
    <>
      {!isAuthWrap && isRegister && (
        <RegisterForm setIsRegister={handleCloseSignUp} />
      )}
      {!isAuthWrap && !isRegister && <LoginForm setIsRegister={handleSignUp} />}
    </>
  );
};

export default LoginPage;
