import { createContext, useContext, PropsWithChildren, useState} from "react";

interface ILoginContext {
  isLogin: boolean;
  loginHandler: () => void;
}

const LoginContext = createContext<ILoginContext>({
  isLogin: false,
  loginHandler: () => {},
});

export const useLogin = () => useContext(LoginContext);

const LoginProvider = ({children}: PropsWithChildren) => {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const loginHandler = () => {
    setIsLogin(() => !isLogin);
  }

  return <LoginContext.Provider value={{isLogin, loginHandler}}>{children}</LoginContext.Provider>;
}

export default LoginProvider;