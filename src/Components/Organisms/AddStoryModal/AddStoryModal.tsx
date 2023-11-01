import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import CustomAudioPlayer from "./CustomAudioPlayer";
type props = {
  open: boolean;
  handleModal: () => void;
};
const AddStoryModal = (props: props) => {
  const { open, handleModal } = props;

  const handleCut = () => {};
  return (
    <Modal title="Likes" open={open} onOk={handleModal} onCancel={handleModal} footer={null} width={900}>
      <CustomAudioPlayer audioSrc="https://aac.saavncdn.com/047/d1366530468931703ac909e82a3ee788_320.mp4" />
    </Modal>
  );
};

export default AddStoryModal;
