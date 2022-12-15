import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const HomePage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleSignUp = () => {
    setIsRegister(true);
  };

  const handleCloseSignUp = () => {
    setIsRegister(false);
  }

  return (
    <>
      {isRegister ? <RegisterForm setIsRegister={handleCloseSignUp}/> : <LoginForm setIsRegister={handleSignUp}/>}
    </>
  );
};

export default HomePage;