import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Popconfirm, Space, message } from "antd";
import { CgMenuRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DeletePost from "../../../APIs/DeletePost";
import { Request_Succesfull } from "../../../Utils/Constant";

type props = {
  room_id: string;
};
const RoomMenuBox = (props: props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Close Chat",
      onClick: () => {},
    },
    {
      key: "2",
      label: "Block",
      onClick: () => {},
    },
    {
      key: "3",
      label: "Clear Chat",
      onClick: () => {},
    },

    {
      key: "4",
      danger: true,
      label: "Delete Chat",
      onClick: () => {},
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
          <Space>
            <CgMenuRight />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default RoomMenuBox;
