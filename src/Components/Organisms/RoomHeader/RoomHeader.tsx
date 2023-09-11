import React,{useState,useEffect} from "react";
import styles from "./style.module.scss";
import GetRoomDetails from "../../../APIs/GetRoomDetails";
import { Request_Succesfull } from "../../../Utils/Constant";
type props = {
  room_id: string;
};
function RoomHeader(props: props) {
  const [details,setDetails]=useState<{}>({})
  const fetchRoomDetails = async () => {
    const res = await GetRoomDetails(props.room_id);
    if (res?.status == Request_Succesfull) {
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img
          className={styles.img}
          src="https://my-social-space.s3.ap-south-1.amazonaws.com/ProfilePictures/A5pfyAEAclcwPTyoKDXpTrKoj6n2/A5pfyAEAclcwPTyoKDXpTrKoj6n2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230907%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T095324Z&X-Amz-Expires=86400&X-Amz-Signature=d23f9996dfa629d866656a70dcc92824eec1055a41f1d0f56055d3fd17ec7256&X-Amz-SignedHeaders=host&x-id=GetObject"
          alt=""
        />
      </div>
      <div className={styles.middle_box}>
        <div className={styles.name}>Ravi</div>
        {/* <div></div> */}
      </div>
      <div className={styles.right_box}>Menu</div>
    </div>
  );
}

export default RoomHeader;
