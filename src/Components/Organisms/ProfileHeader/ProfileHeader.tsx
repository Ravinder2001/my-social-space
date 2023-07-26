import React, { useState } from "react";
import styles from "./styles.module.scss";
import image from "../../../Assets/Images/Vector.png";
function ProfileHeader() {
  const [Status, setStatus] = useState(true);
  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <div className={styles.top_div}></div>
        <img className={styles.img} src={image} alt="" width="100%" />
      </div>
      <div className={`${styles.profile_pic_box} ${Status && styles.IsStatus}`}>
        <img
          src="https://scontent.fpgh1-1.fna.fbcdn.net/v/t39.30808-6/328131189_1123663518301123_8970126291371955891_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=b5Ivp35TckwAX_7F0cm&_nc_ht=scontent.fpgh1-1.fna&oh=00_AfAz0GY8BGrxWJxs2tyCy3AB-p_AQB0WeH0JsQiRz2T3Bg&oe=64C4B810"
          alt=""
          className={styles.profile_pic}
        />
      </div>
      <div className={styles.name}>Ravinder Singh Negi</div>
    </div>
  );
}

export default ProfileHeader;
