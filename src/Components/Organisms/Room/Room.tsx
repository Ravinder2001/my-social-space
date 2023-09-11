import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./style.module.scss";
import MessageInputBox from "../../Molecules/MessageInputBox/MessageInputBox";
import RoomHeader from "../RoomHeader/RoomHeader";
import RoomMessages from "../RoomMessages/RoomMessages";
type props = {
  roomDetails: {
    room_id: string;
    user_image: string;
  };
};
function Room(props: props) {
  const [text, setText] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <RoomHeader room_id={props.roomDetails.room_id} />
      </div>
      <div className={styles.message_box}>
        <RoomMessages />
      </div>
      <div className={styles.bottom_box}>
        <div className={styles.input_box}>
          <MessageInputBox
            placeholder="Send your message"
            value={text}
            handleChange={handleChange}
            handleComment={() => {}}
            handleEmoji={() => {}}
          />
        </div>
        <div className={styles.btn}>Send</div>
      </div>
    </div>
  );
}

export default Room;
