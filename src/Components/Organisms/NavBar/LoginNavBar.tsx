import React, { useState, MouseEvent } from "react";
import styles from "./styles.module.scss";
import Icon from "../../../Assets/Images/Vector.png";
import LoginNavHeader from "../../Molecules/LoginNavHeader/LoginNavHeader";



function LoginNavBar() {
  return (
    <div className={styles.icon_box}>
      <LoginNavHeader/>
      <div className={styles.bottom_style}>
        <img src={Icon} alt="" width="100%" height="100%" />
      </div>
    </div>
  );
}

export default LoginNavBar;
