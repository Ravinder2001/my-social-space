import React from "react";
import styles from "./styles.module.scss";
import ProfileHeader from "../../Organisms/ProfileHeader/ProfileHeader";
import BioContainer from "../../Organisms/BioContainer/BioContainer";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import PostContainer from "../../Organisms/PostContainer/PostContainer";
import PhotosContainer from "../../Organisms/PhotosContainer/PhotosContainer";

function ProfileTemplate() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Posts`,
      children: <PostContainer />,
    },
    {
      key: "2",
      label: `Photos`,
      children: <PhotosContainer />,
    },
    {
      key: "3",
      label: `Friends`,
      children: `Content of Tab Pane 3`,
    },
  ];

  return (
    <div className={styles.container}>
      <ProfileHeader />
      <div className={styles.sub_container}>
        <div className={styles.bio_container}>
          <BioContainer />
        </div>
        <div className={styles.post_container}>
          <div className={styles.post_sub_container}>
            <Tabs defaultActiveKey="2" items={items} className={styles.test} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;
