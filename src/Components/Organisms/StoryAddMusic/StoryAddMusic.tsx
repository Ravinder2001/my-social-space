import React, { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { JioSavanAPI, Request_Succesfull } from "../../../Utils/Constant";
import trendingSongs from "../../../Utils/JioSavanSongs";

type props = {
  handleIsMusic: (index: number) => void;
  isMusic: { index: number; status: boolean };
  setValues: Dispatch<SetStateAction<{ index: number; img: File; start: number; end: number; link: string }[]>>;
};
function StoryAddMusic(props: props) {
  const { handleIsMusic, isMusic } = props;

  const [data, setData] = useState<{ thumbnail: string; song: string }[]>([]);
  const [text, setText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSongClick = (link: string) => {
    props.setValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[isMusic.index] = { ...updatedValues[isMusic.index], link };
      return updatedValues;
    });
    handleIsMusic(-1);
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
      <div
        onClick={() => {
          handleIsMusic(isMusic.index);
        }}
      >
        Back to Image
      </div>

      <input type="text" value={text} onChange={handleChange} className={styles.input} placeholder="Search Any Song" />
      <div className={styles.list}>
        <div className={styles.songs_container}>
          <div className={styles.heading}>Songs</div>
          <div className={styles.songs_list}>
            {data.map((song) => (
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
      </div>
    </div>
  );
}

export default StoryAddMusic;
