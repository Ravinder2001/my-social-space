import  { useState } from "react";
import { useSelector } from "react-redux";

import image from "../../../Assets/Images/Vector.png";

import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";

function ProfileHeader() {
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
          Status && (Theme === "dark" ? styles.IsDarkStatus : styles.IsLightStatus)
        }`}
      >
        <img
          src="https://scontent.fpgh1-1.fna.fbcdn.net/v/t39.30808-6/328131189_1123663518301123_8970126291371955891_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=itz5bnt_c3QAX_Zil-G&_nc_ht=scontent.fpgh1-1.fna&oh=00_AfBOgQq7z6mw65YinyHSiCANeaJ3getUiFhW5Q8DBJA4Gw&oe=64CAA6D0"
          alt=""
          className={styles.profile_pic}
        />
      </div>
      <div className={Theme === "dark" ? styles.dark_name : styles.name}>
        Ravinder Singh Negi
      </div>
    </div>
  );
}

export default ProfileHeader;
