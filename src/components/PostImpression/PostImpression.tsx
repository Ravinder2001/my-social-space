import React from "react";
import styles from "./style.module.css";
import LucideIcon from "../../assets/Icons/LucideIcons";
function PostImpression() {
  return (
    <div className={styles.container}>
      <div className={styles.box} id="like">
        <LucideIcon name="Heart" size={24} color="red" fill="red" />
        <div className={styles.label}>Likes (2)</div>
      </div>
      <div className={styles.box}>
        <LucideIcon name="MessageCircle" size={24} color="rgb(83, 82, 82)" />
        <div className={styles.label}>Comments (2)</div>
      </div>
      <div className={styles.box}>
        <LucideIcon name="SquareGanttChart" size={24} color="rgb(83, 82, 82)" />
        <div className={styles.label}>View Post</div>
      </div>
    </div>
  );
}

export default PostImpression;
