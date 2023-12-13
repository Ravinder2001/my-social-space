import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";

import { Carousel } from "react-responsive-carousel";
import styles from "./style.module.scss";
type props = {
  open: {
    status: boolean;
    data: {
      profile_picture: string;
      username: string;
      user_id: string;
      story: { id: number; story_image: string; song: string; start_time: number; end_time: number; created_at: string }[];
    };
  };
  handleModal: () => void;
};
const StoryModal = (props: props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { open, handleModal } = props;
  const { data } = open;
  console.log("🚀  file: StoryModal.tsx:23  data:", data)

  const [page, setPage] = useState(0);
  useEffect(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      currentAudio.currentTime = data.story[page].start_time;
      currentAudio.play();

      // Set a timeout to stop playback at the specified end_time
      const playbackDuration = (data.story[page].end_time - data.story[page].start_time) * 1000;
      setTimeout(() => {
        currentAudio.pause();
        if(data.story.length>1){

          setPage(page+1)
        }else{
          handleModal()
        }
      }, playbackDuration);
    }
  }, [page, data]);

  return (
    <Modal title="Stories" open={open.status} onOk={handleModal} onCancel={handleModal} footer={null} width={700}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={data.profile_picture} alt="" className={styles.profile} />
          <div>
          <div className={styles.name}>{data.username}</div>

          </div>

        </div>
        <Carousel
          showThumbs={false}
          className={styles.carousel}
          swipeable={false}
          onChange={(index) => {
            setPage(index);
          }}
          selectedItem={page}
        >
          {data.story.map((item, index) =>
            page == index ? (
              <div className={styles.box}>
                <audio ref={audioRef} src={item.song} autoPlay />
                <img src={item.story_image} alt="" className={styles.img} />
              </div>
            ) : (
              <div>hii</div>
            )
          )}
        </Carousel>
      </div>
    </Modal>
  );
};

export default StoryModal;
