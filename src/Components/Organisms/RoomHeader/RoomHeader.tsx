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
  setIsAnotherUserTyping: Dispatch<SetStateAction<{ status: boolean; userImage: string }>>;
  setReceiverName: Dispatch<SetStateAction<{ name: string; image: string }>>;
  setMessages: any;
  setRoomDetails: Dispatch<
    SetStateAction<{
      room_id: string;
      user_image: string;
      user_id: string;
    }>
  >;
  setRoomType: Dispatch<SetStateAction<number>>;
};
type detailsType =
  | {
      type: 1;
      user_name: string;
      image_url: string;
      second_user_id: string;
    }
  | {
      type: 2;
      user_name: string;
      image_url: string;
      members_name: string[];
    };
function RoomHeader(props: props) {
  const [details, setDetails] = useState<detailsType>({
    type: 1,
    user_name: "",
    image_url: "",
    second_user_id: "",
  });
  const [userStatus, setUserStatus] = useState<{
    status: boolean | string;
    timestamp: "";
  }>({ status: false, timestamp: "" });
  const fetchRoomDetails = async () => {
    const res = await GetRoomDetails(props.room_id);
    if (res?.status == Request_Succesfull) {
      setDetails(res?.data);
      props.setReceiverName({
        name: res?.data.user_name,
        image: res?.data.image_url,
      });
      props.setRoomType(res?.data?.type);
    }
  };
  const fetchUserOnlineStatus = async (id: string) => {
    const res = await GetUserOnlineStatus(id);
    if (res?.status == Request_Succesfull) {
      setUserStatus({ status: res.data.status, timestamp: res.data.timestamp });
    }
  };
  useEffect(() => {
    if (props.room_id != "") fetchRoomDetails();
  }, [props.room_id]);

  useEffect(() => {
    if (details.type == 1 && details.second_user_id != "") fetchUserOnlineStatus(details.second_user_id);
  }, [details]);

  useEffect(() => {
    socket.on("User-Offline", () => {
      if (details.type == 1 && details.second_user_id != "") fetchUserOnlineStatus(details.second_user_id);
    });
    socket.on("User-Online", () => {
      if (details.type == 1 && details.second_user_id != "") fetchUserOnlineStatus(details.second_user_id);
    });
    socket.on("User-Typing", () => {
      setUserStatus({ status: "typing", timestamp: "" });

      props.setIsAnotherUserTyping({
        status: true,
        userImage: details.image_url,
      });
    });
    socket.on("User-Not-Typing", () => {
      if (details.type == 1 && details.second_user_id != "") fetchUserOnlineStatus(details.second_user_id);

      props.setIsAnotherUserTyping({
        status: false,
        userImage: "",
      });
    });
    return () => {
      socket.offAny();
    };
  }, [details]);

  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img className={styles.img} src={details.image_url} alt="" />
      </div>
      <div className={styles.middle_box}>
        <div className={styles.name}>{details.user_name}</div>
        {details.type === 1 ? (
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
        <RoomMenuBox room_id={props.room_id} setMessages={props.setMessages} setRoomDetails={props.setRoomDetails} />
      </div>
    </div>
  );
}

export default RoomHeader;
