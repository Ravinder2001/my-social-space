import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Drawer from "../Components/Organisms/Drawer/Drawer";

import { RootState } from "../store/store";
import { Login_Route } from "../Utils/Constant";

import styles from "../App.module.scss";
import Navbar from "../Components/Organisms/Navbar/Navbar";

type PrivateRoutesType = { children: ReactNode };

function PrivateRoutes({ children }: PrivateRoutesType) {
  const User = useSelector((state: RootState) => state.UserReducer.user);
  const [isSearchUser, setIsSearchUser] = useState<boolean>(false);
  return User ? (
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
  ) : (
    <Navigate to={Login_Route} />
  );
}

export default PrivateRoutes;
