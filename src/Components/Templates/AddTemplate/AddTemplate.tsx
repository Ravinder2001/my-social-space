import { useSelector } from "react-redux";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import styles from "./styles.module.scss";
import AddPostBox from "../../Organisms/AddPostBox/AddPostBox";

function AddTemplate() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Add Status`,
      children: <div>Hiii</div>,
    },
    {
      key: "2",
      label: `Add Post`,
      children: <AddPostBox />,
    },
  ];

  return (
    <div className={styles.container}>
      <Tabs
        defaultActiveKey="2"
        items={items}
        className={styles.test}
        // style={{ color: Theme === "dark" ? "white" : "black" }}
      />
    </div>
  );
}

export default AddTemplate;
