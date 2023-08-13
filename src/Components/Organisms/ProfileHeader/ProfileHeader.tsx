import { useState } from "react";
import { useSelector } from "react-redux";

import image from "../../../Assets/Images/Vector.png";

import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";

function ProfileHeader() {
  const User_image = useSelector((state: RootState) => state.UserReducer.image);
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);
  const [Status, setStatus] = useState(true);
  return (
    <div
      className={`${styles.container} ${
        Theme == "dark" ? styles.dark_container : styles.light_container
      }`}
    >
      <div className={styles.imgBox}>
        <div className={styles.top_div}></div>
        <img className={styles.img} src={image} alt="" width="100%" />
      </div>
      <div
        className={`${styles.profile_pic_box} ${styles.IsStatus} ${
          Status &&
          (Theme === "dark" ? styles.IsDarkStatus : styles.IsLightStatus)
        }`}
      >
        <img src={User_image} alt="" className={styles.profile_pic} />
      </div>
      <div className={Theme === "dark" ? styles.dark_name : styles.name}>
        Ravinder Singh Negi
      </div>
    </div>
  );
}

export default ProfileHeader;
