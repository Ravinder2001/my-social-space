import React from "react";
import styles from "./styles.module.scss";
function LogoText() {
  return (
    <div className={styles.container}>
      <div className={styles.left_box}>My S</div>
      <div className={styles.right_box}>
        <div className={styles.top}>ocial</div>
        <div className={styles.bottom}>pace</div>
      </div>
    </div>
  );
}

export default LogoText;
