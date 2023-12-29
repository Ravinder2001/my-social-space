import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import GetPostLikes from "../../../APIs/GetPostLikes";
import { Request_Succesfull } from "../../../Utils/Constant";
type props = {
  open: boolean;
  handleModal: () => void;
  post_id: string;
};
type impressionData = {
  user_name: string;
  image_url: string;
};
const LikeModal = (props: props) => {
  const { open, handleModal, post_id } = props;
  const [impressionData, setImpressionData] = useState<impressionData[]>([]);
  const FetchLikes = async () => {
    const res = await GetPostLikes(post_id);
    if (res?.status == Request_Succesfull) {
      setImpressionData(res.data);
    }
  };
  useEffect(() => {
    if (open) {
      FetchLikes();
    }
  }, [open]);
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
        {impressionData.map((like) => (
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
