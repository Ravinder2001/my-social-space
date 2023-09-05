import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { CgMenuRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

type props = {
  post_id: string;
};
const MenuBox = (props: props) => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit Post",
      onClick: () => {
        navigate(`/add?edit=true&post=${props.post_id}`);
      },
    },
    {
      key: "4",
      danger: true,
      label: "Delete Post",
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
        <Space>
          <CgMenuRight />
        </Space>
      </a>
    </Dropdown>
  );
};

export default MenuBox;
