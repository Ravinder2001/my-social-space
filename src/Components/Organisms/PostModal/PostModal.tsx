import { Modal } from "antd";

import CarouselBox from "../Carousel/Carousel";
import Data from "../../../data.json";
import PostImpression from "../../Molecules/PostImpression/PostImpression";
import PostCommentBox from "../../Molecules/PostCommentBox/PostCommentBox";

import styles from "./styles.module.scss";

type PostModalType = {
  handleModal: () => void;
  open: boolean;
};
const PostModal = (props: PostModalType) => {
  const { handleModal, open } = props;
  return (
    <Modal
      //   title="Basic Modal"
      open={open}
      onOk={handleModal}
      onCancel={handleModal}
      width={1000}
      footer={null}
    >
      <div className={styles.container}>
        <div className={styles.left_box}>
          <CarouselBox images={Data.images} />
        </div>
        <div className={styles.right_box}>
          <PostImpression />
          <div className={styles.comment_box}></div>
          <PostCommentBox />
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
