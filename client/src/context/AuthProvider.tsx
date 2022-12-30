import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

interface IAuthContext {
  isAuth: boolean;
  authHandler: (data: IFormInput) => void;
}

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
  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth]);

  const authHandler = async (data: IFormInput) => {
    const res = await fetch("http://localhost:5000/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      console.log("Błąd logowania");
      return;
    }
    if (res.ok) {
      const {accessToken, refreshToken} = await res.json();
      setCookie("accessToken", accessToken, {maxAge: 15 * 60});
      setCookie("refreshToken", refreshToken, {maxAge: 60 * 60 * 24 * 7});
      console.log("Udało się zalogować");
      setIsAuth(() => !isAuth);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, authHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
