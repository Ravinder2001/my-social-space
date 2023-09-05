import React, { useState, Dispatch, SetStateAction } from "react";
import { Button, Modal, message } from "antd";
import styles from "./style.module.scss";
import DeleteFriendship from "../../../APIs/DeleteFriendship";
import { Request_Succesfull } from "../../../Utils/Constant";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  image_url: string;
  name: string;
  user_id: string;
  FetchAnotherUserProfileData: (e: string) => void;
};
const UnFriendModal = (props: props) => {
  const {
    open,
    setOpen,
    name,
    image_url,
    user_id,
    FetchAnotherUserProfileData,
  } = props;

  const handleCancel = () => {
    setOpen(!open);
  };
  const handleOk = async () => {
    const res = await DeleteFriendship(user_id);
    if (res?.status == Request_Succesfull) {
      message.success(`${name} is not your friend from now.` )
      handleCancel();
      FetchAnotherUserProfileData(user_id);
    }
  };

  return (
    <Modal
      title=""
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Yes"
      cancelText="No"
      className={styles.modal}
    >
      <div className={styles.heading}>
        Are you sure, You want to unfriend this User?
      </div>

      <img src={image_url} alt="" className={styles.img} />

      <div className={styles.name}>{name}</div>
    </Modal>
  );
};

export default UnFriendModal;
