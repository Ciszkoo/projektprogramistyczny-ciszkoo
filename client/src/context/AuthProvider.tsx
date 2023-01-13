import axios, { AxiosError } from "axios";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

import { useAppDispatch } from "../reducers/hooks";
import { fetchCurrUserData } from "../reducers/userReducer";

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
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const eff = async () => {
      if (isAuth) {
        await dispatch(fetchCurrUserData());
      }
    };
    eff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, dispatch]);

  const authHandler = async (data: IFormInput) => {
    try {
      await axios.post("/api/user/login", data);
      console.log("Udało się zalogować");
      setIsAuth(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return;
      }
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post("/api/user/logout");
      setIsAuth(false);
      console.log("Udało się wylogować");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return;
      }
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, authHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
