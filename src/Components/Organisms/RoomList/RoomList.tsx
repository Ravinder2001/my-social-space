import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import RoomListBox from "../RoomListBox/RoomListBox";
import GetMessageRoomList from "../../../APIs/GetMessageRoomList";
import { Request_Succesfull } from "../../../Utils/Constant";
import Loader2 from "../../Atoms/Loader/Loader2/Loader2";
import InfinityLoader from "../../Atoms/Loader/InfinityLoader/InfinityLoader";
type DataType = {
  room_id: string;
  user_id: string;
  user_name: string;
  image_url: string;
  last_message_timestamp: string;
  last_message_content: string;
};
type props = {
  room_id: string;
  setRoomDetails: Dispatch<SetStateAction<{ room_id: string; user_image: string; user_id: string }>>;
};
function RoomList(props: props) {
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
      {loading ? (
        <div className={styles.loader}>
          <InfinityLoader />
        </div>
      ) : (
        <>
          {data.map((item) => (
            <RoomListBox key={item.room_id} room_id={props.room_id} setRoomDetails={props.setRoomDetails} data={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default RoomList;
