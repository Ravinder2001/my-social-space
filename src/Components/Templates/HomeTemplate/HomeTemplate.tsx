import React, { useState, useEffect } from "react";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import styles from "./style.module.scss";
import StoryBox from "../../Organisms/StoryBox/StoryBox";
import HomeBody from "../../Organisms/HomeBody/HomeBody";
import AddStoryModal from "../../Organisms/AddStoryModal/AddStoryModal";


function HomeTemplate() {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <SVGIcons name="Home_Background" />
      </div>
      <div className={styles.main_box}>
        <div className={styles.story_box}>
          <StoryBox handleModal={handleModal} />
        </div>
        <div>
          <HomeBody />
        </div>
      </div>
      {open && <AddStoryModal handleModal={handleModal} open={open} />}
    </div>
  );
}

export default HomeTemplate;
