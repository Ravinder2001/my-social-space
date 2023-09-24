import React from "react";
import styles from "./style.module.scss";
function TypingLoader() {
  return (
    <div className={styles.dot_wave}>
      <div className={styles.dot_wave__dot}></div>
      <div className={styles.dot_wave__dot}></div>
      <div className={styles.dot_wave__dot}></div>
      <div className={styles.dot_wave__dot}></div>
    </div>
  );
}

export default TypingLoader;
