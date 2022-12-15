import { useState } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useLogin } from "../context/LoginProvider";

const HomePage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const { isLogin } = useLogin();

  const handleSignUp = () => {
    setIsRegister(true);
  };

  const handleCloseSignUp = () => {
    setIsRegister(false);
  };

  return (
    <>
      {isLogin && <h1>Strona główna</h1>}
      {!isLogin && isRegister && (
        <RegisterForm setIsRegister={handleCloseSignUp} />
      )}
      {!isLogin && !isRegister && <LoginForm setIsRegister={handleSignUp} />}
    </>
  );
};

export default HomePage;
