import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import StoryAddImages from "../StoryAddImages/StoryAddImages";
import StoryAddCarousel from "../StoryAddCarousel/StoryAddCarousel";
type props = {
  open: boolean;
  handleModal: () => void;
  setFlag: Dispatch<SetStateAction<boolean>>;
};
const AddStoryModal = (props: props) => {
  const { open, handleModal,setFlag } = props;

  const [image, setImage] = useState<File | undefined>(undefined);

  return (
    <Modal title="Add Story" open={open} onOk={handleModal} onCancel={handleModal} footer={null} width={700}>
      {!image ? <StoryAddImages setImage={setImage} /> : <StoryAddCarousel  image={image} handleModal={handleModal} setFlag={setFlag} />}
    </Modal>
  );
};

export default AddStoryModal;
