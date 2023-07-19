import React from "react";
import Logo from "../../../Assets/Images/Logo_2.png";
import styles from "./styles.module.scss";
function LoginPageLogo() {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={Logo} alt="" width="100%" height="100%" />
      </div>
      <div className={styles.heading}>My Social Space</div>
      <div className={styles.sub_heading}>Connect, Share and Explore</div>
    </div>
  );
}

export default LoginPageLogo;
