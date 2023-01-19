import axios, { AxiosError } from "axios";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

import { useAppDispatch } from "../reducers/hooks";
import { fetchMyData } from "../reducers/userReducer";

interface AuthContext {
  isAuth: boolean;
  loading: boolean;
  handleLogin: (data: LoginInput) => void;
  handleLogout: () => void;
}

interface LoginInput {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContext>({
  isAuth: false,
  loading: true,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    checkAuth();
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true);
      await axios.head("/api/sessioncheck");
      setIsAuth(true);
      await dispatch(fetchMyData());
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (data: LoginInput) => {
    try {
      await axios.post("/api/user/login", data);
      console.log("Udało się zalogować");
      await dispatch(fetchMyData());
      setIsAuth(true);
    } catch (error) {
      console.log("Błąd logowania");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      console.log("Udało się wylogować");
      setIsAuth(false);
    } catch (error) {
      console.log("Błąd wylogowania");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
