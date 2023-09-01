import React from "react";
import SVGIcons from "../../../Assets/SVG/SvgIcon";
import styles from "./style.module.scss";
import StoryBox from "../../Organisms/StoryBox/StoryBox";
import HomeBody from "../../Organisms/HomeBody/HomeBody";
function HomeTemplate() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <SVGIcons name="Home_Background" />
      </div>
      <div className={styles.main_box}>
        <div className={styles.story_box}>
          <StoryBox />
        </div>
        <div>
          <HomeBody />
        </div>
      </div>
    </div>
  );
}

export default HomeTemplate;
