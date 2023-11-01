import React from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../../Utils/Icons/LucideIcons";

type props = {
  handlePage: (e: string) => void;
};
function Header(props: props) {
  return (
    <div className={styles.header}>
      <div className={styles.nav_btn}      onClick={() => {
            props.handlePage("Prev");
          }}>
        <div
          className={styles.icon}
     
        >
          <LucideIcons name="ArrowLeft" color="white" size={17} />
        </div>
        <div>Prev</div>
      </div>
      <div
        className={styles.nav_btn}
        onClick={() => {
          props.handlePage("Next");
        }}
      >
        <div className={styles.icon}>Next</div>
        <div>
          <LucideIcons name="ArrowRight" color="white" size={17} />
        </div>
      </div>
    </div>
  );
}

export default Header;
