import axios from "axios";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useAppDispatch } from "../reducers/hooks";
import { setMyId } from "../reducers/userReducer";

interface AuthContextI {
  isAuth: boolean;
  loading: boolean;
  handleLogin: (data: LoginInput) => void;
  handleLogout: () => void;
}

interface LoginInput {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextI>({
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
    // eslint-disable-next-line
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/sessioncheck");
      dispatch(setMyId(data));
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (input: LoginInput) => {
    try {
      const { data } = await axios.post("/api/user/login", input);
      console.log("Udało się zalogować");
      dispatch(setMyId(data));
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
    <AuthContext.Provider
      value={{ isAuth, loading, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
