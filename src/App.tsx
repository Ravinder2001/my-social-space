import jwtDecode from "jwt-decode";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ProjectRoutes from "./Routes/ProjectRoutes";

import { LocalStorageKey } from "./Utils/Constant";
import { LoginUser, Logout } from "./store/Slices/UserSlice";
import { withSuspense } from "./HOC/withSuspense";
import GetServerHealth from "./APIs/GetServerHealth";
import Server from "./Assets/Images/Server.png";

import styles from "./App.module.scss";
import { socket } from "./socket";

interface decode {
  exp: number;
  iat: number;
  id: string;
  name: string;
}
function App() {
  const dispatch = useDispatch();
  const [ServerHealth, setServerHealth] = useState<string>("Loading");

  const logout = () => {
    localStorage.removeItem(LocalStorageKey);
    dispatch(Logout());
  };

  const CheckServerHealth = async () => {
    const ServerRes = await GetServerHealth();
    setServerHealth(ServerRes);
  };
  useEffect(() => {
    CheckServerHealth();
  }, []);

  useEffect(() => {
    if (ServerHealth === "OK") {
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
    }
  }, [ServerHealth]);
  useEffect(() => {
    socket.on("connect", ()=>{
      console.log(socket.id); 
    })
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    
    socket.emit("Add-User", "asasds");

    

    // return () => {
    //   socket.offAny();
    // };
  }, []);

  const ComponentWithSuspense = withSuspense(ProjectRoutes);
  return (
    <>
      {ServerHealth === "Loading" ? (
        "Server Loading"
      ) : ServerHealth === "OK" ? (
        <ComponentWithSuspense />
      ) : (
        <div className={styles.server_con}>
          <img src={Server} alt="" className={styles.server_img} />
        </div>
      )}
    </>
  );
}

export default App;
