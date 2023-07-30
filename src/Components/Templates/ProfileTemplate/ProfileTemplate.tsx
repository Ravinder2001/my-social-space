import { useSelector } from "react-redux";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import ProfileHeader from "../../Organisms/ProfileHeader/ProfileHeader";
import BioContainer from "../../Organisms/BioContainer/BioContainer";
import PostContainer from "../../Organisms/PostContainer/PostContainer";
import PhotosContainer from "../../Organisms/PhotosContainer/PhotosContainer";

import { RootState } from "../../../store/store";

import styles from "./styles.module.scss";

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
  const Theme = useSelector((state: RootState) => state.UserReducer.theme);

  return (
    <div className={styles.container}>
      <ProfileHeader />
      <div
        className={`${styles.sub_container} ${
          Theme === "dark"
            ? styles.dark_sub_container
            : styles.light_sub_container
        }`}
      >
        <div className={styles.bio_container}>
          <BioContainer />
        </div>
        <div className={styles.post_container}>
          <div
            className={`${styles.post_sub_container} ${
              Theme === "dark"
                ? styles.dark_post_sub_container
                : styles.light_post_sub_container
            }`}
          >
            <Tabs
              defaultActiveKey="1"
              items={items}
              className={styles.test}
              style={{ color: Theme === "dark" ? "white" : "black" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;
