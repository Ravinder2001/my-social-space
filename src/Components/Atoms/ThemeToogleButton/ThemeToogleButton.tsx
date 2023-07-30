import React from "react";
import styles from "./styles.module.scss";

type ButtonType = {
  Theme: string;
  handleChange: () => void;
};
function ThemeToogleButton(props: ButtonType) {
  return (
    <div className={styles.toggleWrapper}>
      <input type="checkbox" onChange={props.handleChange} checked={props.Theme=="light"} className={styles.dn} id="dn" />
      <label htmlFor="dn" className={styles.toggle}>
        <span className={styles.toggle_handler}>
          <span className={`${styles.crater} ${styles.crater_1}`}></span>
          <span className={`${styles.crater} ${styles.crater_2}`}></span>
          <span className={`${styles.crater} ${styles.crater_3}`}></span>
        </span>
        <span className={`${styles.star} ${styles.star_1}`}></span>
        <span className={`${styles.star} ${styles.star_2}`}></span>
        <span className={`${styles.star} ${styles.star_3}`}></span>
        <span className={`${styles.star} ${styles.star_4}`}></span>
        <span className={`${styles.star} ${styles.star_5}`}></span>
        <span className={`${styles.star} ${styles.star_6}`}></span>
      </label>
    </div>
  );
}

export default ThemeToogleButton;
