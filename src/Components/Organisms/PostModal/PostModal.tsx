import React, { useState } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import PostModalImages from "../PostModalImages/PostModalImages";
import PostImpression from "../PostImpression/PostImpression";
import PostAddComments from "../PostAddComments/PostAddComments";
import PostCommentsList from "../PostCommentsList/PostCommentsList";
type props = {
  open: boolean;
  handleModal: () => void;
};
const PostModal = (props: props) => {
  const { open, handleModal } = props;

  return (
    <Modal
      // title="Post"
      open={open}
      onOk={handleModal}
      onCancel={handleModal}
      footer={null}
      width={1000}
      centered
    >
      <div className={styles.container}>
        <div className={styles.left_box}>
          <PostModalImages />
        </div>
        <div className={styles.right_box}>
          <PostImpression />
          <PostCommentsList />
          <PostAddComments />
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
