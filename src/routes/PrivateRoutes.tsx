import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { RootState } from "../store/store";
import { Login_Route } from "../utils/constant";
import Sidebar from "../components/Sidebar/Sidebar";

import styles from "../app.module.css";
import Navbar from "../components/Navbar/Navbar";

type PrivateRoutesType = { children: ReactNode };

function PrivateRoutes({ children }: PrivateRoutesType) {
  const User = useSelector((state: RootState) => state.UserReducer.user);

  return User ? (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.sidebarBox}>
        <Sidebar />
        <div className={styles.childrenBox}>{children}</div>
      </div>
      <Toaster />
    </div>
  ) : (
    <Navigate to={Login_Route} />
  );
}

export default PrivateRoutes;
