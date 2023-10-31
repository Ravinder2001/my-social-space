import React, { useState, Dispatch, SetStateAction } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Popconfirm, Space, message } from "antd";
import { CgMenuRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DeletePost from "../../../APIs/DeletePost";
import { Request_Succesfull } from "../../../Utils/Constant";
import DeleteChatHistory from "../../../APIs/DeleteChatHistory";

type props = {
  room_id: string;
  setMessages: any;
  setRoomDetails: Dispatch<
    SetStateAction<{
      room_id: string;
      user_image: string;
      user_id: string;
    }>
  >;
};
const RoomMenuBox = (props: props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Close Chat",
      onClick: () => {
        props.setRoomDetails({
          room_id: "",
          user_image: "",
          user_id: "",
        });
      },
    },
    {
      key: "2",
      label: "Block",
      onClick: () => {},
    },
    {
      key: "3",
      label: "Clear Chat",
      onClick: () => {
        DeleteChat();
      },
    },

    {
      key: "4",
      danger: true,
      label: "Delete Chat",
      onClick: () => {},
    },
  ];

  const DeleteChat = async () => {
    const res = await DeleteChatHistory(props.room_id);
    if (res?.status == Request_Succesfull) {
      props.setMessages([]);
      message.success("Chat deleted successfully");
    }
  };

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
