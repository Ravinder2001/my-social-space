import React from "react";
import styles from "./style.module.css";
import Image from "../Image/Image";
import MenuBox from "../MenuBox/MenuBox";
function MessageRoom() {
  return (
    <div className={styles.chat_area}>
    <div className={styles.chat_area_header}>
      <div className={styles.chat_area_title}>CodePen Group</div>
      <div className={styles.chat_area_group}>
        <img
          className={styles.chat_area_profile}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
          alt=""
        />
        <img className={styles.chat_area_profile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="" />
        <img className={styles.chat_area_profile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
        <span>+4</span>
      </div>
    </div>
    <div className={styles.chat_area_main}>
      <div className={styles.chat_msg}>
        <div className={styles.chat_msg_profile}>
          <img className={styles.chat_msg_img} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
          <div className={styles.chat_msg_date}>Message seen 1.22pm</div>
        </div>
        <div className={styles.chat_msg_content}>
          <div className={styles.chat_msg_text}>
            <img
              alt=""
              src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif"
            />
          </div>
          <div className={styles.chat_msg_text}>
            Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Pretium lectus quam id leo.
          </div>
        </div>
      </div>
      <div className={`${styles.chat_msg} ${styles.owner}`}>
        <div className={styles.chat_msg_profile}>
          <img className={styles.chat_msg_img} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
          <div className={styles.chat_msg_date}>Message seen 1.22pm</div>
        </div>
        <div className={styles.chat_msg_content}>
          <div className={styles.chat_msg_text}>Cras mollis nec arcu malesuada tincidunt.</div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default MessageRoom;
