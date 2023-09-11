import React, { useState, useEffect } from "react";
import RoomList from "../../Organisms/RoomList/RoomList";
import styles from "./style.module.scss";
import Room from "../../Organisms/Room/Room";
function MessageTemplate() {
  const [roomDetails, setRoomDetails] = useState<{
    room_id: string;
    user_image: string;
  }>({
    room_id: "",
    user_image: "",
  });
  return (
    <div className={styles.container}>
      <div className={styles.room_list}>
        <RoomList
          room_id={roomDetails.room_id}
          setRoomDetails={setRoomDetails}
        />
      </div>
      <div className={styles.room}>
        <Room roomDetails={roomDetails} />
      </div>
    </div>
  );
}

export default MessageTemplate;
