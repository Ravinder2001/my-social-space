import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Popconfirm, Space, message } from "antd";
import { CgMenuRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DeletePost from "../../../APIs/DeletePost";
import { Request_Succesfull } from "../../../Utils/Constant";

type props = {
  post_id: string;
};
const MenuBox = (props: props) => {
  const [open, setOpen] = useState(false);
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
      onClick: () => {
        setOpen(true);
        // handleDelete();
      },
    },
  ];
  const handleDelete = async () => {
    const res = await DeletePost(props.post_id);
    if (res?.status == Request_Succesfull) {
      message.success(res?.message);
    }
    setOpen(false);
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
      <Popconfirm
        open={open}
        title="Delete the Post"
        description="Are you sure to delete this Post?"
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
        okText="Yes"
        cancelText="No"
      ></Popconfirm>
    </>
  );
};

export default MenuBox;
