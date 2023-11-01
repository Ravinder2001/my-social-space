import React from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../../Utils/Icons/LucideIcons";
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.nav_btn}>
        <div className={styles.icon}>
          <LucideIcons name="ArrowLeft" color="white" size={17} />
        </div>
        <div>Prev</div>
      </div>
      <div className={styles.nav_btn}>
        <div className={styles.icon}>Next</div>
        <div>
          <LucideIcons name="ArrowRight" color="white" size={17} />
        </div>
      </div>
    </div>
  );
}

export default Header;
