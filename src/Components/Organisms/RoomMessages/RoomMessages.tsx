import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import GetRoomMessages from "../../../APIs/GetRoomMessages";
import { EditMessageTime, Request_Succesfull } from "../../../Utils/Constant";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { formatTime } from "../../../Utils/Function";
import moment from "moment";
type messageType = {
  message: {
    id: number;
    content: string;
    content_type: string;
    created_at: string;
    status: boolean;
    isOwnMessage: boolean;
  };
  user_image: string;
};

function RoomMessages(props: messageType) {
  const { message, user_image } = props;
  const main_image = useSelector((state: RootState) => state.UserReducer.image);
  const currentTime = moment();
  const timeDiff = currentTime.diff(message.created_at, "hours");

  return (
    <div className={message.isOwnMessage ? styles.msg_container : styles.user_msg_container}>
      <div className={styles.img_box}>
        <img src={message.isOwnMessage ? main_image : user_image} alt="" className={styles.img} />
      </div>

      {message.status ? (
        <div className={message.isOwnMessage ? styles.msg_box : styles.user_msg_box}>
          <div className={styles.message}>{message?.content}</div>
          <div className={styles.time}>{moment(message.created_at).format("hh:mm A")}</div>
        </div>
      ) : (
        <div className={true ? styles.msg_box : styles.user_msg_box}>
          <div className={styles.message}>This Message was deleted</div>
          <div className={styles.time}>{moment(message.created_at).format("hh:mm A")}</div>
        </div>
      )}
      {message.isOwnMessage && timeDiff <= EditMessageTime && (
        <div className={styles.message_open}>
          <LucideIcons name="MailOpen" color="#c17306" size={15} />
        </div>
      )}
    </div>
  );
}

export default RoomMessages;
