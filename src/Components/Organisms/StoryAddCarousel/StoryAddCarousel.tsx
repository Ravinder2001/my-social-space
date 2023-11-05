import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Header from "./Header/Header";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import StoryAddMusic from "../StoryAddMusic/StoryAddMusic";
import SongTrimmer from "./SongTrimmer/SongTrimmer";
import { Request_Succesfull, TimeFrame } from "../../../Utils/Constant";
import AddStory from "../../../APIs/AddStory";

type props = {
  image: Blob;
  handleModal: () => void;
};
function StoryAddCarousel(props: props) {
  const { image, handleModal } = props;

  const [isMusic, setIsMusic] = useState<boolean>(false);
  const [values, setValues] = useState<{ song: string; duration: number; start: number; end: number }>({
    song: "",
    duration: 0,
    start: 0,
    end: TimeFrame,
  });

  const handleIsMusic = () => {
    setIsMusic(!isMusic);
  };
  const handleSubmit = async () => {
    let formdata = new FormData();
    formdata.append("image", image);
    formdata.append("song", values.song);
    formdata.append("start_time", values.start.toString());
    formdata.append("end_time", values.end.toString());
    const res = await AddStory(formdata);
    if (res?.status == Request_Succesfull) {
      handleModal();
    }
  };

  return !isMusic && image ? (
    <div className={styles.container}>
      <div className={styles.left_box}>
        <img src={URL.createObjectURL(image)} alt="" className={styles.img} />
        {values.song.length && <SongTrimmer link={values.song} setValues={setValues} duration={values.duration} />}
      </div>
      <div className={styles.right_box}>
        <div className={styles.box} onClick={handleIsMusic}>
          <div>
            <LucideIcons name="Music" color="#ba36f7" />
          </div>
          <div>Music</div>
        </div>
        <div className={styles.box}>
          <div>
            <LucideIcons name="Trash2" color="#c50202" />
          </div>
          <div>Delete</div>
        </div>
        <div className={styles.box} onClick={handleSubmit}>
          <div>
            <LucideIcons name="Check" color="green" />
          </div>
          <div>Delete</div>
        </div>
      </div>
    </div>
  ) : (
    <StoryAddMusic  handleIsMusic={handleIsMusic} setValues={setValues} />
  );
}

export default StoryAddCarousel;
