import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import Drawer from "../Components/Organisms/Drawer/Drawer";
import styles from "../App.module.scss";
type PrivateRoutesType = { children: ReactNode };

function PrivateRoutes({ children }: PrivateRoutesType) {
  const User = useSelector((state: RootState) => state.UserReducer.user);
  return User ? (
    <div className={styles.container}>
      <div className={styles.drawer_box}>
        <Drawer />
      </div>
      <div className={styles.children_box}>{children}</div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
