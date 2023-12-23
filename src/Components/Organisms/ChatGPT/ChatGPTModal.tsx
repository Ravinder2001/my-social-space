import React, { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import { Modal } from "antd";
import styles from "./style.module.scss";
import GenerateCaptions from "../../../APIs/GenerateCaption";
import { Request_Succesfull } from "../../../Utils/Constant";
import { TypeAnimation } from "react-type-animation";
import AiBtn from "../../Atoms/AIBtn/AiBtn";


type props = {
  open: boolean;
  handleModal: () => void;
  setText: Dispatch<SetStateAction<string>>;
};
const ChatGPTModal = (props: props) => {
  const { open, handleModal, setText } = props;
  const [details, setDetails] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [resStack, setResStack] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  const Generate = async () => {
    if (details.length) {
      setLoading(true);
      if (response.length) {
        setResStack((prev) => [...prev, response]);
      }
      setResponse("");
      const res = await GenerateCaptions(details);
      if (res?.status == Request_Succesfull) {
        console.log("Captions", res?.data);
        setResponse(res?.data);
      }
      
    }
  };

  const handleClick = (text: string) => {
    setText(text);
    handleModal();
  };

  return (
    <Modal title="Asistance" open={open} onOk={handleModal} onCancel={handleModal} footer={null} width={700}>
      <div className={styles.container}>
        <textarea
          className={styles.textarea}
          value={details}
          onChange={handleChange}
          rows={5}
          placeholder="Tell about your post!"
          maxLength={300}
        ></textarea>
        <AiBtn handleClick={Generate} loading={loading} />
        {response.length ? (
          <div onClick={() => handleClick(response)}>
            <TypeAnimation
              style={{ whiteSpace: "pre-line", height: "195px", display: "block" }}
              sequence={[response, 1000,()=>{setLoading(false)}]}
              // repeat={Infinity}
              omitDeletionAnimation={true}
              cursor={false}
              className={styles.resGenContainer}
              
            />
          </div>
        ) : null}

        {resStack.length ? (
          <>
            {resStack.map((res) => (
              <div className={styles.resContainer} onClick={() => handleClick(res)}>
                {res}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </Modal>
  );
};

export default ChatGPTModal;
