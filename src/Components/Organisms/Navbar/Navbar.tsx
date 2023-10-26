import React from "react";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import styles from "./style.module.scss";
function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>My Social Space</div>
      <div className={styles.right_box}>
        <div className={styles.icon} id={styles.bell}>
          <LucideIcons name="BellDot" color="#124aba"/>
        </div>
        <div className={styles.icon} id={styles.plus}>
          <LucideIcons name="UserPlus" color="#620684" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
