import React, { useState, useEffect } from "react";
import RoomList from "../../Organisms/RoomList/RoomList";
import styles from "./style.module.scss";
import Room from "../../Organisms/Room/Room";
import message from "../../../Assets/Images/message.png";
import { Request_Succesfull } from "../../../Utils/Constant";
import GetMessageRoomList from "../../../APIs/GetMessageRoomList";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
type DataType = {
  room_id: string;
  user_id: string;
  user_name: string;
  image_url: string;
  last_message_timestamp: string;
  last_message_content: string;
  type: number;
};
function MessageTemplate() {
  const [roomDetails, setRoomDetails] = useState<{
    room_id: string;
    user_image: string;
    user_name: string;
    user_id: string;
    type: number;
  }>({
    room_id: "",
    user_image: "",
    user_id: "",
    user_name: "",
    type: -1,
  });
  const isMobile = useSelector((state: RootState) => state.TempReducer.isMobile);
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
          <Room roomDetails={roomDetails} setRoomDetails={setRoomDetails} />
        </div>
      )}

      {!isMobile && (
        <div className={styles.room_list}>
          <RoomList room_id={roomDetails.room_id} setRoomDetails={setRoomDetails} loading={loading} data={data} />
        </div>
      )}

      {!isMobile && roomDetails.room_id !== "" && (
        <div className={styles.room}>
          <Room roomDetails={roomDetails} setRoomDetails={setRoomDetails} />
        </div>
      )}
    </div>
  );
}

export default MessageTemplate;
