import React from "react";

import jwtDecode from "jwt-decode";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProjectRoutes from "./Routes/ProjectRoutes";

import { LocalStorageKey } from "./Utils/Constant";
import { LoginUser, Logout } from "./store/Slices/UserSlice";
import { withSuspense } from "./HOC/withSuspense";
import GetServerHealth from "./APIs/GetServerHealth";
import Server from "./Assets/Images/Server.png";
import Welcom_Video_Mob from "./Assets/Videos/welcome_video_mob.mp4";
import Welcom_Video_Des from "./Assets/Videos/welcome_video_des.mp4";

import styles from "./App.module.scss";
import { socket } from "./socket";
import { toogleIsMobile } from "./store/Slices/TempSlice";
import { RootState } from "./store/store";
import { useNavigate } from "react-router-dom";

interface decode {
  exp: number;
  iat: number;
  id: string;
  name: string;
}
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useSelector((state: RootState) => state.TempReducer.isMobile);

  const [ServerHealth, setServerHealth] = useState<string>("Loading");

  const logout = () => {
    localStorage.removeItem(LocalStorageKey);
    dispatch(Logout());
  };

  const CheckServerHealth = async () => {
    const ServerRes = await GetServerHealth();
    setTimeout(() => {
      setServerHealth(ServerRes);
    }, 2000);
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
            socket.emit("Add-User", decode.id);
            dispatch(LoginUser(decode));
            navigate("/verify");
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
    const handleResize = () => {
      dispatch(toogleIsMobile(window.innerWidth < 768));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ComponentWithSuspense = withSuspense(ProjectRoutes);
  return (
    <>
      {ServerHealth === "Loading" ? (
        <div style={{ width: "100%", height: "100vh" }}>
          <video width="100%" height="100%" autoPlay muted style={{ border: "none !important" }}>
            <source src={isMobile ? Welcom_Video_Mob : Welcom_Video_Des} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
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
