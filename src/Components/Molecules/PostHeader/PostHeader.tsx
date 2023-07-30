import React from "react";
import styles from "./styles.module.scss";
import MenuBox from "../MenuBox/MenuBox";
function PostHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.left_box}>
        <img
          src="https://scontent.fpgh1-1.fna.fbcdn.net/v/t39.30808-6/360166238_3641344796149437_4549872185033154998_n.jpg?stp=dst-jpg_p960x960&_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=Ja6gZzFlBTUAX-Ql5fE&_nc_ht=scontent.fpgh1-1.fna&oh=00_AfAqen4u3XSKOAsJC2D3ikldvNt-weeGa6uQK4PqgLk6NA&oe=64C64ECD"
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.middle_box}>
        <div className={styles.post_details}>
          <span className={styles.name}>Ravinder Singh Negi</span>
        </div>
        <div className={styles.time}>17 July 2023 at 00:54</div>
      </div>
      <div className={styles.right_box}>
        <MenuBox />
      </div>
    </div>
  );
}

export default PostHeader;
