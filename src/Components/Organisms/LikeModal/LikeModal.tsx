import React, { useState } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
type props = {
  open: boolean;
  handleModal: () => void;
  list: { user_name: string; image_url: string }[];
};
const LikeModal = (props: props) => {
  const { open, handleModal, list } = props;

  return (
    <Modal
      title="Likes"
      open={open}
      onOk={handleModal}
      onCancel={handleModal}
      footer={null}
      width={400}
    >
      <div className={styles.container}>
        {list.map((like) => (
          <div className={styles.box}>
            <div className={styles.img_box}>
              <img src={like.image_url} alt="" className={styles.img} />
            </div>
            <div className={styles.name}>{like.user_name}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default LikeModal;
