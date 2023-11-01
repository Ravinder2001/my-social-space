import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import StoryAddImages from "../StoryAddImages/StoryAddImages";
import StoryAddCarousel from "../StoryAddCarousel/StoryAddCarousel";
type props = {
  open: boolean;
  handleModal: () => void;
};
const AddStoryModal = (props: props) => {
  const { open, handleModal } = props;

  const [images, setImages] = useState<FileList | undefined>(undefined);

  return (
    <Modal title="Add Story" open={open} onOk={handleModal} onCancel={handleModal} footer={null} width={700}>
      {!images ? <StoryAddImages setImages={setImages} /> : <StoryAddCarousel images={images} />}
    </Modal>
  );
};

export default AddStoryModal;
