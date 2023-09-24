import React, { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import { formatTime } from "../../../Utils/Function";
type props = {
  data: {
    room_id: string;
    user_name: string;
    image_url: string;
    last_message_timestamp: string;
    last_message_content: string;
  };
  room_id:string,
  setRoomDetails: Dispatch<
    SetStateAction<{ room_id: string; user_image: string }>
  >;
};
function RoomListBox(props: props) {
  const { data, setRoomDetails,room_id } = props;
  const handleClick = () => {
    setRoomDetails({
      room_id: data.room_id,
      user_image: data.image_url,
    });
  };
  return (
    <div className={`${styles.container} ${room_id==data.room_id && styles.isSelected}`} onClick={handleClick}>
      <div className={styles.img_box}>
        <img className={styles.img} src={data.image_url} alt="" />
      </div>
      <div className={styles.center}>
        <div className={styles.name}>{data.user_name}</div>
        <div className={styles.message}>{data.last_message_content}</div>
      </div>
      <div className={styles.right_box}>
        <div className={styles.time}>
          {formatTime(data.last_message_timestamp)}
        </div>
      </div>
    </div>
  );
}

export default RoomListBox;
