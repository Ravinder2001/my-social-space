import React from "react";
import styles from "./styles.module.scss";
function ProfileBox() {
  let image =
    "https://scontent.fpgh1-1.fna.fbcdn.net/v/t39.30808-6/328131189_1123663518301123_8970126291371955891_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=b5Ivp35TckwAX_7F0cm&_nc_ht=scontent.fpgh1-1.fna&oh=00_AfAz0GY8BGrxWJxs2tyCy3AB-p_AQB0WeH0JsQiRz2T3Bg&oe=64C4B810";
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img src={image} alt="" className={styles.img} />
      </div>
      <div className={styles.name}>Ravinder Singh Negi</div>
      <div className={styles.id}>@ravinder</div>
      <div className={styles.bottom_box}>
        <div className={styles.post_box}>
            <div className={styles.number}>40</div>
            <div className={styles.text}>Posts</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.friend_box}>
            <div className={styles.number}>30</div>
            <div className={styles.text}>Friends</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBox;
