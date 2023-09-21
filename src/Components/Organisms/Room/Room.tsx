import React, { useState, useEffect, ChangeEvent, KeyboardEvent, FocusEventHandler } from "react";
import styles from "./style.module.scss";
import MessageInputBox from "../../Molecules/MessageInputBox/MessageInputBox";
import RoomHeader from "../RoomHeader/RoomHeader";
import RoomMessages from "../RoomMessages/RoomMessages";
import GetRoomMessages from "../../../APIs/GetRoomMessages";
import { Request_Succesfull } from "../../../Utils/Constant";
import SendMessage from "../../../APIs/SendMessage";
import { message } from "antd";
import UpdateUserOnlineStatus from "../../../APIs/UpdateUserOnlineStatus";
type props = {
  roomDetails: {
    room_id: string;
    user_image: string;
  };
};

type messageType = {
  id: number;
  content: string;
  content_type: string;
  created_at: string;
  status: boolean;
  isOwnMessage: boolean;
};
function Room(props: props) {
  const { room_id, user_image } = props.roomDetails;

  const [text, setText] = useState<string>("");
  const [Messages, setMessages] = useState<messageType[]>([]);
  const [UserTyping, setUserTyping] = useState<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    console.log("blue");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (!UserTyping) {
      setUserTyping(true);
    }
  };

  const fetchMessages = async () => {
    const res = await GetRoomMessages(room_id);
    if (res?.status == Request_Succesfull) {
      setMessages(res?.data);
    }
  };

  const sendMessage = async () => {
    let object = {
      room_id: room_id,
      content: text,
      content_type: text,
    };
    const res = await SendMessage(object);
    if (res?.status == Request_Succesfull) {
      message.success("message sentl");
    }
  };

  const toogleStatus = async () => {
    await UpdateUserOnlineStatus(UserTyping ? "typing" : "online", UserTyping ? props.roomDetails.room_id : "");
  };

  useEffect(() => {
    if (props.roomDetails.room_id != "") fetchMessages();
  }, [props.roomDetails.room_id]);

  useEffect(() => {
    const search = setTimeout(() => {
      setUserTyping(false);
    }, 3000);
    return () => clearTimeout(search);
  }, [text]);
  useEffect(() => {
    toogleStatus();
  }, [UserTyping]);

  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <RoomHeader room_id={props.roomDetails.room_id} />
      </div>
      <div className={styles.message_box}>
        {Messages.map((message) => (
          <RoomMessages message={message} user_image={user_image} />
        ))}
      </div>
      <div className={styles.bottom_box}>
        <div className={styles.input_box}>
          <MessageInputBox
            max_length={100}
            placeholder="Send your message"
            value={text}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleKeyDown={handleKeyDown}
            // handleKeyUp={handleKeyUp}
            handleComment={() => {}}
            handleEmoji={() => {}}
          />
        </div>
        <div className={styles.btn} onClick={sendMessage}>
          Send
        </div>
      </div>
    </div>
  );
}

export default Room;
