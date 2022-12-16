import { createContext, useContext, PropsWithChildren, useState} from "react";

import { useNavigate } from "react-router-dom";

interface IAuthContext {
  isAuth: boolean;
  authHandler: () => void;
}

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  authHandler: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}: PropsWithChildren) => {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const authHandler = () => {
    setIsAuth(() => !isAuth);
    navigate("/home");
  }

  return <AuthContext.Provider value={{isAuth, authHandler}}>{children}</AuthContext.Provider>;
}

export default AuthProvider;