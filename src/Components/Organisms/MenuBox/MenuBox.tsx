import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { CgMenuRight } from "react-icons/cg";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Edit Post",
  },
  {
    key: "4",
    danger: true,
    label: "Delete Post",
  },
];

const MenuBox = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
      <Space>
        <CgMenuRight />
      </Space>
    </a>
  </Dropdown>
);

export default MenuBox;
