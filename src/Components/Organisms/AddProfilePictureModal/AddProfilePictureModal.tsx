import * as Yup from "yup";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";

import styles from "./styles.module.scss";

type AddProfilePictureModalType = {
  open: boolean;
  closeable: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddProfilePictureModal = (props: AddProfilePictureModalType) => {
  const { open, setOpen, closeable } = props;
  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <Modal
      title="Add Profile Picture"
      open={open}
      onCancel={handleModal}
      footer={null}
      cancelButtonProps={{ style: { display: "none" } }}
      className={styles.modal}
      centered
      maskClosable={false}
      closable={closeable}
    >
      <div>Picture</div>
    </Modal>
  );
};

export default AddProfilePictureModal;
