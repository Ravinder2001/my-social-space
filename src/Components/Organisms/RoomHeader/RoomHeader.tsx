import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import GetRoomDetails from "../../../APIs/GetRoomDetails";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetUserOnlineStatus from "../../../APIs/GetUserOnlineStatus";
import { formatTime } from "../../../Utils/Function";
import { socket } from "../../../socket";
import RoomMenuBox from "../RoomMenuBox/RoomMenuBox";

type props = {
  room_id: string;
  type: number;
  user_name: string;
  user_id: string;
  image_url: string;
  setIsAnotherUserTyping: Dispatch<SetStateAction<{ status: boolean; userImage: string }>>;
  setMessages: any;
  setRoomDetails: Dispatch<
    SetStateAction<{
      room_id: string;
      user_image: string;
      user_name: string;
      user_id: string;
      type: number;
    }>
  >;
};
function RoomHeader(props: props) {
  const { room_id, type, user_id, user_name, image_url } = props;
  const [userStatus, setUserStatus] = useState<{
    status: boolean | string;
    timestamp: "";
  }>({ status: false, timestamp: "" });

  const fetchUserOnlineStatus = async (id: string) => {
    const res = await GetUserOnlineStatus(id);
    if (res?.status == Request_Succesfull) {
      setUserStatus({ status: res.data.status, timestamp: res.data.timestamp });
    }
  };

  useEffect(() => {
    if (type == 1 && user_id != "") fetchUserOnlineStatus(user_id);
  }, [user_id,type]);

  useEffect(() => {
    socket.on("User-Offline", () => {
      if (type == 1 && user_id != "") fetchUserOnlineStatus(user_id);
    });
    socket.on("User-Online", () => {
      if (type == 1 && user_id != "") fetchUserOnlineStatus(user_id);
    });
    socket.on("User-Typing", () => {
      console.log("hii");
      setUserStatus({ status: "typing", timestamp: "" });

      props.setIsAnotherUserTyping({
        status: true,
        userImage: image_url,
      });
    });
    socket.on("User-Not-Typing", () => {
      if (type == 1 && user_id != "") fetchUserOnlineStatus(user_id);

      props.setIsAnotherUserTyping({
        status: false,
        userImage: "",
      });
    });
    return () => {
      socket.offAny();
    };
  }, [room_id,type, user_id, user_name, image_url]);

  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img className={styles.img} src={image_url} alt="" />
      </div>
      <div className={styles.middle_box}>
        <div className={styles.name}>{user_name}</div>
        {type === 1 ? (
          <>
            {userStatus.status == true ? (
              <div className={styles.status}>Online</div>
            ) : (
              <>
                {userStatus.status == "typing" ? (
                  <div className={styles.status}>...typing</div>
                ) : (
                  <div className={styles.status}>last seen {formatTime(userStatus.timestamp)}</div>
                )}
              </>
            )}
          </>
        ) : null}
      </div>
      <div className={styles.right_box}>
        <RoomMenuBox type={type} room_id={props.room_id} setMessages={props.setMessages} setRoomDetails={props.setRoomDetails} />
      </div>
    </div>
  );
}

export default RoomHeader;
