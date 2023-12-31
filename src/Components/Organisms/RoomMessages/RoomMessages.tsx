import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import GetRoomMessages from "../../../APIs/GetRoomMessages";
import { EditMessageTime, Request_Succesfull } from "../../../Utils/Constant";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { formatTime } from "../../../Utils/Function";
import moment from "moment";
import EditMessageModal from "../EditMessageModal/EditMessageModal";
type MembersType = {
  id: string;
  role: string | null;
  name: string;
  ismessageallowed: boolean;
  image_url: string;
};
type messageType = {
  message: {
    id: number;
    content: string;
    content_type: string;
    sender_id: string;
    created_at: string;
    status: boolean;
    isOwnMessage: boolean;
    isedited: boolean;
  };
  user_image: string;
  user_id: string;
  showImage: boolean;
  type: number;
  fetchMessages: () => void;
  roomMembers: MembersType[];
};

function RoomMessages(props: messageType) {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  const { message, user_image } = props;
  const main_image = useSelector((state: RootState) => state.UserReducer.image);
  const currentTime = moment();
  const timeDiff = currentTime.diff(message.created_at, "hours");
  const group_userImage = props.roomMembers.find((roomMember) => roomMember.id == props.message.sender_id);

  return (
    <div className={message.isOwnMessage ? styles.msg_container : styles.user_msg_container}>
      <div className={styles.img_box}>
        {props.showImage && (
          <img src={message.isOwnMessage ? main_image : props.type == 2 ? group_userImage?.image_url : user_image} alt="" className={styles.img} />
        )}
      </div>

      {message.status ? (
        <div className={message.isOwnMessage ? styles.msg_box : styles.user_msg_box}>
          <div>
            {props.type == 2&&!message.isOwnMessage ? <div className={styles.group_name}>{group_userImage?.name}</div> : null}

            <div className={styles.message}>{message?.content}</div>
          </div>

          <div className={styles.time_con}>
            {message.isedited && <div className={styles.edited}>Edited</div>}

            <div className={styles.time}>{moment(message.created_at).format("hh:mm A")}</div>
          </div>
        </div>
      ) : (
        <div className={message.isOwnMessage ? styles.msg_box : styles.user_msg_box}>
          <div className={styles.message}>This Message was deleted</div>
          <div className={styles.time}>{moment(message.created_at).format("hh:mm A")}</div>
        </div>
      )}

      {message.isOwnMessage && message.status && timeDiff <= EditMessageTime && (
        <div className={styles.message_open} onClick={handleModal}>
          <LucideIcons name="MailOpen" color="#c17306" size={15} />
        </div>
      )}

      <EditMessageModal
        handleModal={handleModal}
        open={open}
        message_id={message.id}
        content={message.content}
        user_id={props.user_id}
        fetchMessages={props.fetchMessages}
        isEdited={message.isedited}
      />
    </div>
  );
}

export default RoomMessages;
