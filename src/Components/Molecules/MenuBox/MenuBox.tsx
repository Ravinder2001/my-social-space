import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

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
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuBox;