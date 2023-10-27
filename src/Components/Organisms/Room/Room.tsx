import React, { useState, useEffect, ChangeEvent, KeyboardEvent, FocusEventHandler } from "react";
import styles from "./style.module.scss";
import MessageInputBox from "../../Molecules/MessageInputBox/MessageInputBox";
import RoomHeader from "../RoomHeader/RoomHeader";
import RoomMessages from "../RoomMessages/RoomMessages";
import GetRoomMessages from "../../../APIs/GetRoomMessages";
import { Request_Succesfull } from "../../../Utils/Constant";
import SendMessage from "../../../APIs/SendMessage";
import { message } from "antd";
import TypingLoader from "../../Atoms/Loader/TypingLoader/TypingLoader";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import { socket } from "../../../socket";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
type props = {
  roomDetails: {
    room_id: string;
    user_image: string;
    user_id: string;
  };
};

type messageType = {
  id: number;
  content: string;
  content_type: string;
  created_at: string;
  status: boolean;
  isOwnMessage: boolean;
  isedited: boolean;
};
function Room(props: props) {
  const { room_id, user_image, user_id } = props.roomDetails;
  const [text, setText] = useState<string>("");
  const [Messages, setMessages] = useState<messageType[]>([]);
  const [UserTyping, setUserTyping] = useState<boolean>(false);
  const [isAnotherUserTyping, setIsAnotherUserTyping] = useState<{ status: boolean; userImage: string }>({
    status: false,
    userImage: "",
  });
  const UserId = useSelector((state: RootState) => state.UserReducer.id);

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
    const res = await GetRoomMessages(room_id, 1);
    if (res?.status == Request_Succesfull) {
      setMessages(res?.data);
    }
  };

  const sendMessage = async () => {
    let object = {
      room_id: room_id,
      content: text,
      content_type: "text",
    };
    const res = await SendMessage(object);
    if (res?.status == Request_Succesfull) {
      socket.emit("Message-Sent", res.data, user_id);
      console.log("sss", res?.data);
      setMessages((prev) => [res.data, ...prev]);
    }
    setText("");
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
    if (UserTyping) {
      socket.emit("User-Typing", user_id);
    } else {
      socket.emit("User-Not-Typing", user_id);
    }
  }, [UserTyping]);

  useEffect(() => {
    const handleMessageReceive = ({ data }: any) => {
      setMessages((prev) => [data, ...prev]);
    };
    socket.on("Message-Receive", handleMessageReceive);
    socket.on("Message-Edited", fetchMessages);

    return () => {
      socket.offAny();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <RoomHeader room_id={props.roomDetails.room_id} setIsAnotherUserTyping={setIsAnotherUserTyping} />
      </div>
      <div className={styles.message_box}>
        {isAnotherUserTyping.status && (
          <div className={styles.typing_container}>
            <img src={isAnotherUserTyping.userImage} className={styles.typing_img} alt="" />

            <TypingLoader />
          </div>
        )}
        {Messages.map((message, index) => {
          let showImage = true;
          if (index > 0 && Messages[index].isOwnMessage == Messages[index - 1].isOwnMessage) {
            showImage = false;
          }
          return <RoomMessages key={message.id} showImage={showImage} message={message} user_image={user_image} user_id={user_id} fetchMessages={fetchMessages} />;
        })}
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
