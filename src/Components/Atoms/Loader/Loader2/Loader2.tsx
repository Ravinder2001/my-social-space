import styles from "./styles.module.scss"

function Loader2() {
  return (
    <div className={`${styles.spinner} ${styles.center}`}>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
    </div>
  );
}

export default Loader2;
