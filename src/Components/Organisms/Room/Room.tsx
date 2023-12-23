import React, { useState, useEffect, ChangeEvent, KeyboardEvent, FocusEventHandler, Dispatch, SetStateAction } from "react";
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
import UpdateMessageSeen from "../../../APIs/UpdateMessageSeen";
import GetSeenMessage from "../../../APIs/GetSeenMessage";
import { formatTime } from "../../../Utils/Function";
import moment from "moment";
import AutoMessageReply from "../AutoMessageReply/AutoMessageReply";
import GenerateSuggestion from "../../../APIs/GenerateSuggestion";
type props = {
  roomDetails: {
    room_id: string;
    user_image: string;
    user_id: string;
  };
  setRoomDetails: Dispatch<
    SetStateAction<{
      room_id: string;
      user_image: string;
      user_id: string;
    }>
  >;
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
  const UserId = useSelector((state: RootState) => state.UserReducer.id);

  const [text, setText] = useState<string>("");
  const [Messages, setMessages] = useState<messageType[]>([]);
  const [UserTyping, setUserTyping] = useState<boolean>(false);
  const [isAnotherUserTyping, setIsAnotherUserTyping] = useState<{ status: boolean; userImage: string }>({
    status: false,
    userImage: "",
  });
  const [ReceiverName, setReceiverName] = useState<{ name: string; image: string }>({
    image: "",
    name: "",
  });
  const [roomType, setRoomType] = useState<number>(0);
  const [lastSeenMsg, setLastSeenMsg] = useState<{ message_id: number; seen_at: string }>({
    message_id: 0,
    seen_at: "",
  });
  const [newMessage, setNewMessage] = useState<string>("");
  const [isGenerate, setIsGenerate] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");
  const FetchSuggestion = async () => {
    if (newMessage.length) {
      setIsGenerate(true);
      const res = await GenerateSuggestion(newMessage);
      if (res?.status == Request_Succesfull) {
        setSuggestion(res?.data);
      }
    }
  };
  const SuggestClick = () => {
    sendMessage(suggestion);
  };

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

  const sendMessage = async (suggestion?: any) => {

    socket.emit("User-Not-Typing", user_id);
    let object = {
      room_id: room_id,
      content: suggestion?.length ? suggestion : text,
      content_type: "text",
    };
    const res = await SendMessage(object);
    if (res?.status == Request_Succesfull) {
      setMessages((prev) => [res.data, ...prev]);
      socket.emit("Message-Sent", res.data, user_id);
      let noti_data = {
        name: ReceiverName.name,
        image: ReceiverName.image,
        content: res.data.content,
        content_type: res.data.content_type,
      };
      socket.emit("Message-Sent-Notifications", noti_data, user_id);
      setIsGenerate(false);
      setSuggestion("")
    }
    setText("");
  };
  const ToogleMessageSeen = async (msg_id: number) => {
    const lastMsg = Messages.find((msg) => !msg.isOwnMessage);
    if (lastMsg && lastMsg?.id != msg_id) {
      let object = {
        room_id: props.roomDetails.room_id,
        id: lastMsg.id,
      };
      const res = await UpdateMessageSeen(object);
      // if (res?.status == Request_Succesfull) {
      // }
    }
  };
  const FetchSeenMsg = async () => {
    let object = {
      room_id: props.roomDetails.room_id,
      user_id: props.roomDetails.user_id,
    };
    let res = await GetSeenMessage(object);
    if (res?.status == Request_Succesfull && res?.data) {
      setLastSeenMsg(res?.data);
    }
  };
  const FetchOwnSeenMsg = async () => {
    let object = {
      room_id: props.roomDetails.room_id,
      user_id: UserId,
    };
    let res = await GetSeenMessage(object);
    if (res?.status == Request_Succesfull && res?.data) {
      ToogleMessageSeen(res?.data?.message_id);
      // setLastSeenMsg(res?.data);
    }
  };

  useEffect(() => {
    if (Messages.length && roomType == 1) {
      FetchOwnSeenMsg();
      FetchSeenMsg();
    }
  }, [Messages, roomType]);

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
      setIsGenerate(false);
    };
    socket.on("Message-Receive", handleMessageReceive);
    socket.on("Message-Edited", fetchMessages);

    return () => {
      socket.offAny();
    };
  }, []);

  useEffect(() => {
    let latestMsg = Messages.find((msg) => msg.isOwnMessage == false);
    if (latestMsg) setNewMessage(latestMsg?.content);
  }, [Messages]);

  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <RoomHeader
          setReceiverName={setReceiverName}
          room_id={props.roomDetails.room_id}
          setIsAnotherUserTyping={setIsAnotherUserTyping}
          setMessages={setMessages}
          setRoomDetails={props.setRoomDetails}
          setRoomType={setRoomType}
        />
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
          return (
            <>
              {message.id == lastSeenMsg?.message_id && <div className={styles.seen_text}>Seen {formatTime(lastSeenMsg?.seen_at)}</div>}
              <RoomMessages
                key={message.id}
                showImage={showImage}
                message={message}
                user_image={user_image}
                user_id={user_id}
                fetchMessages={fetchMessages}
              />
            </>
          );
        })}
      </div>
      <div className={styles.bottom_box}>
        <AutoMessageReply isGenerate={isGenerate} suggestion={suggestion} FetchSuggestion={FetchSuggestion} SuggestClick={SuggestClick} />

        <div className={styles.manual_box}>
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
    </div>
  );
}

export default Room;
