import React, { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { JioSavanAPI, Request_Succesfull } from "../../../Utils/Constant";
import trendingSongs from "../../../Utils/JioSavanSongs";

type props = {
  handleIsMusic: () => void;
  setValues: Dispatch<SetStateAction<{ song: string; start: number; end: number; duration: number }>>;
};
function StoryAddMusic(props: props) {
  const { handleIsMusic, setValues } = props;

  const [data, setData] = useState<{ thumbnail: string; song: string; duration: number }[]>([]);
  const [text, setText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSongClick = (link: string, duration: number) => {
    setValues((prev) => ({ ...prev, song: link, duration }));
    handleIsMusic();
  };

  const FetchSongs = async () => {
    const res = await axios.get(`${JioSavanAPI}?query=${text}`);
    if (res?.status === Request_Succesfull) {
      const modifiedData = res?.data?.data?.results.map((item: any) => {
        const lastDownloadUrl = item.downloadUrl[item.downloadUrl.length - 1].link;
        const lastImageLink = item.image[item.image.length - 1].link;

        return {
          song: lastDownloadUrl,
          thumbnail: lastImageLink,
          duration: item.duration,
        };
      });

      setData(modifiedData);
    }
  };

  useEffect(() => {
    if (text.length) {
      FetchSongs();
    } else {
      setData(trendingSongs);
    }
  }, [text]);

  return (
    <div className={styles.container}>
      <div onClick={handleIsMusic}>Back to Image</div>

      <input type="text" value={text} onChange={handleChange} className={styles.input} placeholder="Search Any Song" />
      <div className={styles.list}>
        <div className={styles.songs_container}>
          <div className={styles.heading}>Songs</div>
          <div className={styles.songs_list}>
            {data.map((song) => (
              <div
                className={styles.song}
                onClick={() => {
                  handleSongClick(song.song, song.duration);
                }}
              >
                <img src={song.thumbnail} alt="" width={100} height={100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryAddMusic;
