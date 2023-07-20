import React, { useState } from "react";

import styles from "./styles.module.scss";
import LoginPageLogo from "../../Molecules/LoginPageLogo/LoginPageLogo";
import LoginNavBar from "../../Organisms/NavBar/LoginNavBar";
import LoginBox from "../../Organisms/LoginBox/LoginBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import SignUpBox from "../../Organisms/SignUpBox/SignUpBox";

function LoginTemplate() {
  const SelectedIndex = useSelector(
    (state: RootState) => state.loginPage.index
  );
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <LoginPageLogo />
      </div>
      <div className={styles.right_container}>
        <LoginNavBar />
        {SelectedIndex === "0" && <LoginBox />}
        {SelectedIndex === "1" && <SignUpBox />}
        {SelectedIndex === "2" && <div>About Us Page</div>}
        {SelectedIndex === "3" && <div>Contact Us Page</div>}
      </div>
    </div>
  );
}

export default LoginTemplate;
