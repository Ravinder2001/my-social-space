import { useEffect } from "react";
import ProjectRoutes from "./Routes/ProjectRoutes";
import { LocalStorageKey } from "./Utils/Constant";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { LoginUser, Logout } from "./store/Slices/UserSlice";
import { setIndex } from "./store/Slices/DrawerSlice";

interface decode {
  exp: number;
  iat: number;
  id: string;
  name: string;
}
function App() {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem(LocalStorageKey);
    dispatch(Logout());
  };
  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKey);
    if (token) {
      const decode: decode = jwtDecode(token);
      if (decode) {
        let exp = decode.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp > currentTime) {
          dispatch(LoginUser(decode));
  
        } else {
          logout();
        }
      } else {
        logout();
      }
    } else {
      logout();
    }
  }, []);
  return <ProjectRoutes />;
}

export default App;
