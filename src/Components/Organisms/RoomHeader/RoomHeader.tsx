import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import GetRoomDetails from "../../../APIs/GetRoomDetails";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetUserOnlineStatus from "../../../APIs/GetUserOnlineStatus";
import { formatTime } from "../../../Utils/Function";
type props = {
  room_id: string;
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
    status: string;
    timestamp: "";
    room_id: string | null;
  }>({ status: "", timestamp: "", room_id: null });
  const fetchRoomDetails = async () => {
    const res = await GetRoomDetails(props.room_id);
    if (res?.status == Request_Succesfull) {
      setDetails(res?.data);
    }
  };
  const fetchUserOnlineStatus = async (id: string) => {
    const res = await GetUserOnlineStatus(id);
    if (res?.status == Request_Succesfull) {
      setUserStatus({ status: res.data.status, timestamp: res.data.timestamp, room_id: res.data.room_id });
    }
  };
  useEffect(() => {
    if (props.room_id != "") fetchRoomDetails();
  }, [props.room_id]);
  useEffect(() => {
    if (details.type == 1) if (details.second_user_id != "") fetchUserOnlineStatus(details.second_user_id);
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
            {userStatus.status == "online" ? (
              <div className={styles.name}>Online</div>
            ) : (
              <>
                {userStatus.status == "typing" && userStatus.room_id == props.room_id ? (
                  <div className={styles.name}>...typing</div>
                ) : (
                  <div className={styles.name}>last seen at {formatTime(userStatus.timestamp)}</div>
                )}
              </>
            )}
          </>
        ) : null}
      </div>
      <div className={styles.right_box}>Menu</div>
    </div>
  );
}

export default RoomHeader;
