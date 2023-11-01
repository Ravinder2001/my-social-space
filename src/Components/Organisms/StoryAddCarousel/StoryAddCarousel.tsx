import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Header from "./Header/Header";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import StoryAddMusic from "../StoryAddMusic/StoryAddMusic";
import SongTrimmer from "./SongTrimmer/SongTrimmer";

type props = {
  images?: FileList;
};
function StoryAddCarousel(props: props) {
  const { images } = props;
  const [isMusic, setIsMusic] = useState<boolean>(false);
  const [musicLink, setMusicLink] = useState<string>("");

  const handleIsMusic = () => {
    setIsMusic(!isMusic);
  };
  return (
    <div className={styles.container}>
      {!isMusic ? (
        <div className={styles.sub_con}>
          <Header />
          <div className={styles.main_container}>
            <div className={styles.left_box}>
              <img src="https://cdn.pixabay.com/photo/2023/09/09/08/31/woman-8242672_1280.jpg" alt="" className={styles.img} />
              <SongTrimmer link="https://aac.saavncdn.com/047/d1366530468931703ac909e82a3ee788_320.mp4"/>
            </div>
            <div className={styles.right_box}>
              <div className={styles.box} onClick={handleIsMusic}>
                <div>
                  <LucideIcons name="Music" color="#ba36f7" />
                </div>
                <div>Music</div>
              </div>
              <div className={styles.box}>Delete</div>
            </div>
          </div>
        </div>
      ) : (
        <StoryAddMusic handleIsMusic={handleIsMusic} setMusicLink={setMusicLink} />
      )}
    </div>
  );
}

export default StoryAddCarousel;
