import React from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MenuBox from "../MenuBox/MenuBox";
function PostHeader() {
  const User = useSelector((state: RootState) => state.UserReducer.image);
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img src={User} alt="" className={styles.img} />
      </div>
      <div className={styles.middle_box}>
        <div className={styles.name}>Ravinder Singh Negi</div>
        <div className={styles.time}>10 April at 10 PM</div>
      </div>
      <div className={styles.left_box}><MenuBox/></div>
    </div>
  );
}

export default PostHeader;
