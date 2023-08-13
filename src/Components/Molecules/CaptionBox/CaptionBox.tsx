import React, { useState, ChangeEvent } from "react";
import { Mentions } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design CSS
import styles from "./style.module.scss";

const users = ["afc163", "zombieJ", "yesmeck"];
const hashtags = ["react", "antd"];

interface CaptionProps {
  value: string;
  handleCaption: (text: string) => void;
}

function CaptionBox(props: CaptionProps) {
  const { value, handleCaption } = props;
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
    <div>
      <div className={styles.heading}>Caption</div>
      <Mentions
        prefix={["@", "#"]}
        className={styles.input_box}
        style={{ width: "100%" }}
        rows={6}
        value={value}
        onChange={handleCaption}
        onSearch={(text, prefix) => {
          return handlePrefixData(prefix);
        }}
        placeholder="Write your caption here. You can use '@' to tag users and '#' for hashtags."
      >
        {ListData.map((item) => (
          <Mentions.Option key={item} value={item}>{item}</Mentions.Option>
        ))}
      </Mentions>
    </div>
  );
}

export default CaptionBox;
