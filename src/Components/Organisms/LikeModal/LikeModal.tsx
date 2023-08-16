import { Modal } from "antd";

import CarouselBox from "../Carousel/Carousel";
import Data from "../../../data.json";
import PostImpression from "../../Molecules/PostImpression/PostImpression";
import PostCommentBox from "../../Molecules/PostCommentBox/PostCommentBox";

import styles from "./styles.module.scss";

type LikeModalType = {
  handleModal: (e: string) => void;
  open: boolean;
  list: { username: string; image_url: string }[];
};
const LikeModal = (props: LikeModalType) => {
  const { handleModal, open, list } = props;
  console.log(list);
  return (
    <Modal
      //   title="Basic Modal"
      open={open}
      onOk={() => handleModal("")}
      onCancel={() => handleModal("")}
      width={400}
      footer={null}
    >
      <div className={styles.container}>
        {list.map((item) => (
          <div className={styles.list_box}>
            <div className={styles.img_box}>
              <img src={item.image_url} alt="" className={styles.img} />
            </div>
            <div className={styles.name}>{item.username}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default LikeModal;
