import * as Yup from "yup";

import { useState, ChangeEvent } from "react";
import { Modal, message } from "antd";

import styles from "./styles.module.scss";
import InputBox1 from "../../Atoms/InputBox/InputBox1/InputBox1";
import UpdateMessageStatus from "../../../APIs/UpdateMessageStatus";
import UpdateMessageContent from "../../../APIs/UpdateMessageContent";
import { Request_Succesfull } from "../../../Utils/Constant";
import { socket } from "../../../socket";

type EditMessageModalProps = {
  open: boolean;
  isEdited: boolean;
  handleModal: () => void;
  message_id: number;
  content: string;
  user_id: string;
  fetchMessages: () => void;
};
const EditMessageModal = (props: EditMessageModalProps) => {
  const [message, setMessage] = useState(props.content);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleDelete = async () => {
    const res = await UpdateMessageStatus({ message_id: props.message_id, status: false });

    if (res?.status == Request_Succesfull) {
      props.fetchMessages();
      props.handleModal();
      socket.emit("Message-Edited", props.user_id);
    }
  };
  const handleUpdate = async () => {
    const res = await UpdateMessageContent({ message_id: props.message_id, content: message });
    if (res?.status == Request_Succesfull) {
      props.fetchMessages();
      props.handleModal();
      socket.emit("Message-Edited", props.user_id);
    }
  };
  return (
    <Modal title="Edit Your Message" open={props.open} onCancel={props.handleModal} footer={null} className={styles.modal} centered>
      <div>
        <div className={styles.delete} onClick={handleDelete}>
          Delete
        </div>
        {!props.isEdited && (
          <>
          <div className={styles.line}></div>
            <InputBox1 type="text" value={message} onChange={handleChange} />
            <div className={styles.update} onClick={handleUpdate}>
              Update
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EditMessageModal;
