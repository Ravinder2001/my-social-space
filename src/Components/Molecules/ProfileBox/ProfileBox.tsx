import styles from "./styles.module.scss";

function ProfileBox() {
  let image =
    "https://scontent.fpgh1-1.fna.fbcdn.net/v/t39.30808-6/328131189_1123663518301123_8970126291371955891_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=itz5bnt_c3QAX_Zil-G&_nc_ht=scontent.fpgh1-1.fna&oh=00_AfBOgQq7z6mw65YinyHSiCANeaJ3getUiFhW5Q8DBJA4Gw&oe=64CAA6D0";
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
