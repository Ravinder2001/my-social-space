import React, { useState, ChangeEvent } from "react";
import { Mentions } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design CSS
import styles from "./style.module.scss";

const users = ["afc163", "zombieJ", "yesmeck"];
const hashtags = ["react", "antd"];

interface CaptionProps {
  value: string;
  handleCaption: (text: string) => void;
  handleModal: () => void;
}

function CaptionBox(props: CaptionProps) {
  const { value, handleCaption, handleModal } = props;
  const [ListData, setListData] = useState<string[]>([]);

  const handlePrefixData = (e: string) => {
    if (e == "@") {
      setListData(users);
    }
    if (e == "#") {
      setListData(hashtags);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <div className={styles.heading}>Caption</div>
        <div onClick={handleModal} className={styles.ai}>Generate by AI!</div>
      </div>
      <Mentions
        prefix={["@", "#"]}
        className={styles.input_box}
        style={{ width: "100%" }}
        rows={6}
        maxLength={255}
        value={value}
        onChange={handleCaption}
        onSearch={(text, prefix) => {
          return handlePrefixData(prefix);
        }}
        placeholder="Write your caption here. You can use '@' to tag users and '#' for hashtags."
      >
        {ListData.map((item) => (
          <Mentions.Option key={item} value={item}>
            {item}
          </Mentions.Option>
        ))}
      </Mentions>
    </div>
  );
}

export default CaptionBox;
