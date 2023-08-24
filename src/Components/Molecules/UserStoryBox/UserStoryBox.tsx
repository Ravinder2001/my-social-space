import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ReactIcons from "../../../Utils/Icons/ReactIcons";
import axios from "axios";
function UserStoryBox() {
  let user =
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_2.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230822%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T113609Z&X-Amz-Expires=86400&X-Amz-Signature=69673807b0fd2e84f8d2c12d447d0b0ca9d391dcad1a12e190920d5557acc6cb&X-Amz-SignedHeaders=host&x-id=GetObject";
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img
          src="https://cdn.pixabay.com/photo/2022/07/10/12/44/large-leaved-lupine-7312789_1280.jpg"
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.user_img_box}>
        <img src={user} alt="" className={styles.user_img} />
      </div>
      <div className={styles.name}>Ravinder Singh Negi</div>
    </div>
  );
}

export default UserStoryBox;
