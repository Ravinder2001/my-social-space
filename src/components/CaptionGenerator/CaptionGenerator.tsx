import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal/Modal";
import { modalDefaultOptions } from "../../utils/types";
import styles from "./style.module.css";
import GenerativeBtn from "../Buttons/GenerativeBtn/GenerativeBtn";

type Props = {
  setCaption: Dispatch<SetStateAction<string>>;
} & modalDefaultOptions; // Combine both types

function CaptionGenerator(props: Props) {
  const [caption, setCaption] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(event.target.value);
  };
  return (
    <Modal isOpen={props.isOpen} handleModal={props.handleModal} title="Generate Caption">
      <div className={styles.container}>
        <textarea
          name="caption"
          value={caption}
          onChange={handleChange}
          id=""
          className={styles.textarea}
          rows={5}
          placeholder="Hello, How may I help you today!"
        ></textarea>
        <GenerativeBtn label="Generate" onClick={() => {}} />
      </div>
    </Modal>
  );
}

export default CaptionGenerator;
