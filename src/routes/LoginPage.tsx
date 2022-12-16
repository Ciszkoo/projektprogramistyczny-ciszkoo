import { useState } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const { isAuth } = useAuth();

  const handleSignUp = () => {
    setIsRegister(true);
  };

  const handleCloseSignUp = () => {
    setIsRegister(false);
  };

  return (
    <>
      {isAuth && <h1>Strona główna</h1>}
      {!isAuth && isRegister && (
        <RegisterForm setIsRegister={handleCloseSignUp} />
      )}
      {!isAuth && !isRegister && <LoginForm setIsRegister={handleSignUp} />}
    </>
  );
};

export default LoginPage;
