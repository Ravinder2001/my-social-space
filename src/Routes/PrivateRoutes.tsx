import React, { ReactNode, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import Drawer from "../Components/Organisms/Drawer/Drawer";

import { RootState } from "../store/store";
import { Login_Route } from "../Utils/Constant";

import styles from "../App.module.scss";
import Navbar from "../Components/Organisms/Navbar/Navbar";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import LucideIcons from "../Utils/Icons/LucideIcons";
import { socket } from "../socket";
type PrivateRoutesType = { children: ReactNode };

function PrivateRoutes({ children }: PrivateRoutesType) {
  const User = useSelector((state: RootState) => state.UserReducer.user);
  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({ name: "Default" });
  const location = useLocation();
  
  const [isSearchUser, setIsSearchUser] = useState<boolean>(false);
  
  const openNotification = (props: { name: string; image: string; content: string; content_type: string }) => {
    let placement: NotificationPlacement = "topRight";
    api.info({
      message: `Message from ${props.name}`,
      description: <Context.Consumer>{({ name }) => `${props.content_type == "text" ? props.content : "Picture"}`}</Context.Consumer>,
      placement,
      icon: <LucideIcons name="MessageSquare" color="#33d14e" />,
    });
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  
  useEffect(() => {
    socket.on("Message-Sent-Notifications", (data) => {
      if (location.pathname != "/messages") {
        openNotification(data.data);
      }
    });

    return () => {
      socket.offAny();
    };
  }, []);
  return User ? (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.drawer_box}>
          <Drawer isSearchUser={isSearchUser} setIsSearchUser={setIsSearchUser} />
        </div>
        <div className={styles.children_box}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div className={styles.children} onClick={() => setIsSearchUser(false)}>
            {children}
          </div>
        </div>
      </div>
    </Context.Provider>
  ) : (
    <Navigate to={Login_Route} />
  );
}

export default PrivateRoutes;
