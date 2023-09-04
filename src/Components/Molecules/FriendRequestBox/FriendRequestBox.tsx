import React, { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import { formatTime } from "../../../Utils/Function";
import { message } from "antd";
import AcceptFriendRequest from "../../../APIs/AcceptFriendRequest";
import { Request_Succesfull } from "../../../Utils/Constant";
import DeleteFriendRequest from "../../../APIs/DeleteFriendRequest";
type props = {
  id: number;
  name: string;
  status: string;
  created_at: string;
  image_url: string;
  user_id: string;
  setFlag: Dispatch<SetStateAction<boolean>>;
  flag: boolean;
};
function FriendRequestBox(props: props) {
  const DeleteRequest = async () => {
    const res = await DeleteFriendRequest(props.id);
    if (res?.status == Request_Succesfull) {
      message.success("Request Removed Successfully");
      props.setFlag(!props.flag);
    }
  };
  const AcceptRequest = async () => {
    const res = await AcceptFriendRequest(props.id, props.user_id);
    if (res?.status == Request_Succesfull) {
      message.success("Request Accepted");
      props.setFlag(!props.flag);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.img_box}>
        <img src={props.image_url} alt="" className={styles.img} />
      </div>
      <div className={styles.right_box}>
        <div className={styles.name_group}>
          <div className={styles.name}>{props.name}</div>
          <div>{formatTime(props.created_at)}</div>
        </div>
        <div className={styles.btn_group}>
          <div className={styles.accept} onClick={AcceptRequest}>
            Accept
          </div>
          <div className={styles.reject} onClick={DeleteRequest}>
            Reject
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestBox;
