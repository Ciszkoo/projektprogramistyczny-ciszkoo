import axios, { AxiosError } from "axios";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useLayoutEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../reducers/hooks";
import { fetchUserData } from "../reducers/userReducer";

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
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (isAuth) {
      navigate("/home");
      dispatch(fetchUserData());
    }
  }, [isAuth, navigate, dispatch]);

  const authHandler = async (data: IFormInput) => {
    try {
      await axios.post("http://localhost:5000/api/users/login", data);
      setIsAuth(true);
      console.log("Udało się zalogować");
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
      await axios.post("http://localhost:5000/api/users/logout");
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
