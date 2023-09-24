import React, { useState, useEffect } from "react";
import RoomList from "../../Organisms/RoomList/RoomList";
import styles from "./style.module.scss";
import Room from "../../Organisms/Room/Room";
import message from "../../../Assets/Images/message.png";
function MessageTemplate() {
  const [roomDetails, setRoomDetails] = useState<{
    room_id: string;
    user_image: string;
    user_id:string
  }>({
    room_id: "",
    user_image: "",
    user_id: "",
  });
  return (
    <div className={styles.container}>
      <div className={styles.room_list}>
        <RoomList room_id={roomDetails.room_id} setRoomDetails={setRoomDetails} />
      </div>
      {roomDetails.room_id != "" ? (
        <div className={styles.room}>
          <Room roomDetails={roomDetails} />
        </div>
      ) : (
        <div className={styles.img}>
          <img src={message} alt="" width="100%" height="100%" />
        </div>
      )}
    </div>
  );
}

export default MessageTemplate;
