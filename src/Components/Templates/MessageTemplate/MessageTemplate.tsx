import React, { useState, useEffect } from "react";
import RoomList from "../../Organisms/RoomList/RoomList";
import styles from "./style.module.scss";
import Room from "../../Organisms/Room/Room";
import message from "../../../Assets/Images/message.png";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetMessageRoomList from "../../../APIs/GetMessageRoomList";
type DataType = {
  room_id: string;
  user_id: string;
  user_name: string;
  image_url: string;
  last_message_timestamp: string;
  last_message_content: string;
};
function MessageTemplate() {
  const [roomDetails, setRoomDetails] = useState<{
    room_id: string;
    user_image: string;
    user_id: string;
  }>({
    room_id: "",
    user_image: "",
    user_id: "",
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRoomsList = async () => {
    setLoading(true);
    const res = await GetMessageRoomList();
    if (res?.status == Request_Succesfull) {
      setData(res?.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchRoomsList();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.container}>
      {isMobile && !data.length && roomDetails.room_id === "" && (
        <div className={styles.img}>
          <img src={message} alt="" width="100%" height="100%" />
        </div>
      )}

      {isMobile && data.length && roomDetails.room_id === "" && (
        <div className={styles.room_list}>
          <RoomList room_id={roomDetails.room_id} setRoomDetails={setRoomDetails} loading={loading} data={data} />
        </div>
      )}

      {isMobile && roomDetails.room_id !== "" && (
        <div className={styles.room}>
          <Room roomDetails={roomDetails} />
        </div>
      )}

      {!isMobile && (
        <div className={styles.room_list}>
          <RoomList room_id={roomDetails.room_id} setRoomDetails={setRoomDetails} loading={loading} data={data} />
        </div>
      )}

      {!isMobile && roomDetails.room_id !== "" && (
        <div className={styles.room}>
          <Room roomDetails={roomDetails} />
        </div>
      )}





    </div>
  );
}

export default MessageTemplate;
