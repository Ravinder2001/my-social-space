import React, { useState, useEffect } from "react";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import styles from "./style.module.scss";
import StoryBox from "../../Organisms/StoryBox/StoryBox";
import HomeBody from "../../Organisms/HomeBody/HomeBody";
import AddStoryModal from "../../Organisms/AddStoryModal/AddStoryModal";
import StoryModal from "../../Organisms/StoryModal/StoryModal";

function HomeTemplate() {
  const [AddStoryModalOpen, setAddStoryModalOpen] = useState(false);
  const [StoryModalOpen, setStoryModalOpen] = useState<{
    status: boolean;
    data: {
      profile_picture: string;
      username: string;
      user_id: string;
      story: { id: number; story_image: string; song: string; start_time: number; end_time: number; created_at: string }[];
    };
  }>({
    status: false,
    data: {
      profile_picture: "",
      username: "",
      user_id: "",
      story: [{ id: 0, story_image: "", song: "", start_time: 0, end_time: 0, created_at: "" }],
    },
  });

  const handleAddStoryModal = () => {
    setAddStoryModalOpen(!AddStoryModalOpen);
  };
  const handleStoryModal = () => {
    setStoryModalOpen((prev) => ({ ...prev, status: !StoryModalOpen.status }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <SVGIcons name="Home_Background" />
      </div>
      <div className={styles.main_box}>
        <div className={styles.story_box}>
          <StoryBox handleModal={handleAddStoryModal} setStoryModalOpen={setStoryModalOpen} />
        </div>
        <div>
          <HomeBody />
        </div>
      </div>
      {AddStoryModalOpen && <AddStoryModal handleModal={handleAddStoryModal} open={AddStoryModalOpen} />}
      {StoryModalOpen.status && <StoryModal handleModal={handleStoryModal} open={StoryModalOpen} />}
    </div>
  );
}

export default HomeTemplate;
