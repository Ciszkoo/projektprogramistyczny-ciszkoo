import { createContext, useContext, PropsWithChildren, useState } from "react";

import { useNavigate } from "react-router-dom";

interface IAuthContext {
  isAuth: boolean;
  authHandler: (data: IFormInput) => void;
}

// TEMP
interface IFormInput {
  email: string;
  password: string;
}

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  authHandler: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  // TEMP
  const userTenant: IFormInput = { email: "user@user.com", password: "user" };

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const authHandler = (data: IFormInput) => {
    if (
      data.email === userTenant.email &&
      data.password === userTenant.password
    ) {
      setIsAuth(() => !isAuth);
      navigate("/home");
    } else {
      console.log("Niepoprawne dane logowania");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, authHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
