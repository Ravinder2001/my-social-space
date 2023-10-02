import * as Yup from "yup";

import { useState, ChangeEvent } from "react";
import { Modal, message } from "antd";

import styles from "./styles.module.scss";
import InputBox1 from "../../Atoms/InputBox/InputBox1/InputBox1";
import UpdateMessageStatus from "../../../APIs/UpdateMessageStatus";
import UpdateMessageContent from "../../../APIs/UpdateMessageContent";
import { Request_Succesfull } from "../../../Utils/Constant";

type EditMessageModalProps = {
  open: boolean;
  handleModal: () => void;
  message_id: number;
  content: string;
};
const EditMessageModal = (props: EditMessageModalProps) => {
  const [message, setMessage] = useState(props.content);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleDelete = async () => {
    const res = await UpdateMessageStatus({ message_id: props.message_id, status: false });

    if (res?.status == Request_Succesfull) {
      props.handleModal();
    }
  };
  const handleUpdate = async () => {
    const res = await UpdateMessageContent({ message_id: props.message_id, content: message });
    if (res?.status == Request_Succesfull) {
      props.handleModal();
    }
  };
  return (
    <Modal title="Edit Your Message" open={props.open} onCancel={props.handleModal} footer={null} className={styles.modal} centered>
      <div>
        <div className={styles.delete} onClick={handleDelete}>
          Delete
        </div>
        <div className={styles.line}></div>
        <InputBox1 type="text" value={message} onChange={handleChange} />
        <div className={styles.update} onClick={handleUpdate}>
          Update
        </div>
      </div>
    </Modal>
  );
};

export default EditMessageModal;
