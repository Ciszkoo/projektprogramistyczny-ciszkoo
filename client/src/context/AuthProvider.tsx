import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useLayoutEffect,
} from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { fetchUserData, selectUser } from "../reducers/userReducer";

interface IAuthContext {
  isAuth: boolean;
  authHandler: (data: IFormInput) => void;
  logoutHandler: () => void;
}

interface IFormInput {
  email: string;
  password: string;
}

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  authHandler: () => {},
  logoutHandler: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(selectUser);

  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);

  useLayoutEffect(() => {
    const accessing = async () => {
      if (!cookies.accessToken && !cookies.refreshToken) {
        console.log("Brak ciasteczek");
        setIsAuth(false);
        return;
      }
      if (!cookies.accessToken && cookies.refreshToken) {
        const res = await fetch("http://localhost:5000/api/session/refresh", {
          method: "POST",
          headers: {
            "x-refresh": cookies.refreshToken,
          },
        });
        if (!res.ok) {
          console.log("Błąd autoryzacji");
          setIsAuth(false);
          return;
        }
        if (res.ok) {
          const { accessToken } = await res.json();
          setCookie("accessToken", accessToken, { maxAge: 14 * 60 });
          return;
        }
      }
      if (cookies.accessToken && cookies.refreshToken) {
        try {
          setIsAuth(true);
          await dispatch(fetchUserData(cookies.accessToken));
        } catch (error) {
          console.log(error);
          return;
        }
      }
    };
    accessing();
  }, [cookies, setCookie, dispatch]);

  const authHandler = async (data: IFormInput) => {
    const res = await fetch("http://localhost:5000/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.log("Błąd logowania");
      return;
    }
    if (res.ok) {
      const { accessToken, refreshToken } = await res.json();
      setCookie("accessToken", accessToken, { maxAge: 14 * 60 });
      setCookie("refreshToken", refreshToken, { maxAge: 60 * 60 * 24 * 7 });
      console.log("Udało się zalogować");
    }
  };

  const logoutHandler = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ isAuth, authHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
