import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const items: MenuProps["items"] = [
  {
    label: "Item 1",
    key: "item1",
    icon: <MailOutlined />,
  },
  {
    label: "Item 2",
    key: "item2",
    icon: <SettingOutlined />,
  },
];

const MenuBox: React.FC = () => {
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ color: Theme === "dark" ? "white" : "black" }}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default MenuBox;
