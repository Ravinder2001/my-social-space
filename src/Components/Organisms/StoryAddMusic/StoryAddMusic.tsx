import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { JioSavanAPI } from "../../../Utils/Constant";
import trendingSongs from "../../../Utils/JioSavanSongs";

type props = {
  handleIsMusic: () => void;
  setMusicLink: Dispatch<SetStateAction<string>>;
};
function StoryAddMusic(props: props) {
  const { handleIsMusic } = props;

  const [data, setData] = useState([]);

  const handleSongClick = (link: string) => {
    props.setMusicLink(link);
    handleIsMusic();
  };

  const FetchTrendings = async () => {
    const res = await axios.get(`${JioSavanAPI}?songs&language=hindi`);
    console.log("🚀  file: StoryAddMusic.tsx:13  res:", res);
  };
  useEffect(() => {
    FetchTrendings();
  }, []);
  return (
    <div className={styles.container}>
      <div onClick={handleIsMusic}>Back to Image</div>

      <input type="text" className={styles.input} placeholder="Search Any Song" />
      <div className={styles.list}>
        {!data.length ? (
          <div className={styles.songs_container}>
            <div className={styles.heading}>Trending Songs</div>
            <div className={styles.songs_list}>
              {trendingSongs.map((song) => (
                <div
                  className={styles.song}
                  onClick={() => {
                    handleSongClick(song.song);
                  }}
                >
                  <img src={song.thumbnail} alt="" width={100} height={100} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default StoryAddMusic;
