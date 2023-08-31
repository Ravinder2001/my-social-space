import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Drawer from "../Components/Organisms/Drawer/Drawer";

import { RootState } from "../store/store";
import { Login_Route } from "../Utils/Constant";

import styles from "../App.module.scss";
import NavBar from "../Components/Organisms/NavBar/NavBar";

type PrivateRoutesType = { children: ReactNode };

function PrivateRoutes({ children }: PrivateRoutesType) {
  const User = useSelector((state: RootState) => state.UserReducer.user);
  return User ? (
    <div className={styles.container}>
      <div className={styles.drawer_box}>
        <Drawer />
      </div>
      <div className={styles.children_box}>
        <NavBar />
        {children}
      </div>
    </div>
  ) : (
    <Navigate to={Login_Route} />
  );
}

export default PrivateRoutes;
