import React from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ReactIcons from "../../../Utils/Icons/ReactIcons";
function PostCommentsList() {
  const User = useSelector((state: RootState) => state.UserReducer.image);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.img_box}>
          <img src={User} alt="" className={styles.img} />
        </div>
        <div className={styles.content_box}>
          <div className={styles.name}>Ravinder Singh Negi</div>
          <div className={styles.content}>Nice Pic</div>
          <div className={styles.time}>Time</div>
        </div>
        <div className={styles.icon}>
          <ReactIcons name="MdDelete" size={20} />
        </div>
      </div>
    </div>
  );
}

export default PostCommentsList;
