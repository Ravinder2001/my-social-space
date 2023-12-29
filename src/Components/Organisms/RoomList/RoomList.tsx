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
  type:number
};
type props = {
  room_id: string;
  setRoomDetails: Dispatch<SetStateAction<{ room_id: string; user_image: string;user_name: string; user_id: string,type:number }>>;
  loading: boolean;
  data: DataType[];
};
function RoomList(props: props) {
  return (
    <div className={styles.container}>
      {props.loading ? (
        <div className={styles.loader}>
          <InfinityLoader />
        </div>
      ) : (
        <>
          {props.data.map((item) => (
            <RoomListBox key={item.room_id} room_id={props.room_id} setRoomDetails={props.setRoomDetails} data={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default RoomList;
