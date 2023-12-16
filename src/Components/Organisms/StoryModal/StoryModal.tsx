import React, { useState, useEffect, useRef } from "react";
import { Modal, Popconfirm, message } from "antd";

import { Carousel } from "react-responsive-carousel";
import styles from "./style.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import { formatTime } from "../../../Utils/Function";
import DeleteStory from "../../../APIs/DeleteStory";
import { Request_Succesfull } from "../../../Utils/Constant";
type props = {
  open: {
    status: boolean;
    data: {
      profile_picture: string;
      username: string;
      user_id: string;
      editable?: boolean;
      story: { id: number; story_image: string; song: string; start_time: number; end_time: number; created_at: string }[];
    };
  };
  handleModal: () => void;
};
const StoryModal = (props: props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { open, handleModal } = props;
  const { data } = open;

  const [page, setPage] = useState(0);

  const handleDelete = async (id: number) => {
    const res = await DeleteStory(id);
    if (res?.status === Request_Succesfull) {
      handleModal()
      message.success("Story deleted successfully");
      
    }
  };
  useEffect(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      currentAudio.currentTime = data.story[page].start_time;
      currentAudio.play();

      // Set a timeout to stop playback at the specified end_time
      const playbackDuration = (data.story[page].end_time - data.story[page].start_time) * 1000;
      setTimeout(() => {
        console.log("done");
        currentAudio.pause();
        if (data.story.length > 1) {
          setPage(page + 1);
        } else {
          handleModal();
        }
      }, playbackDuration);
    }
  }, [page, data]);

  return (
    <Modal title="Stories" open={open.status} onOk={handleModal} onCancel={handleModal} footer={null} width={700}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={data.profile_picture} alt="" className={styles.profile} />
          <div className={styles.headerBox}>
            <div>
              <div className={styles.name}>{data.username}</div>
              <div className={styles.time}>Last added {formatTime(data.story[data.story.length - 1].created_at)}</div>
            </div>
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
                {data.editable ? (
                  <Popconfirm
                    title="Delete the Story"
                    description="Are you sure to delete this Story?"
                    onConfirm={() => {
                      handleDelete(item.id);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div className={styles.deleteBox}>
                      <LucideIcons name="Trash2" color="red" />
                    </div>
                  </Popconfirm>
                ) : null}
                {item.song.length ? <audio ref={audioRef} src={item.song} autoPlay /> : null}

                <img src={item.story_image} alt="" className={styles.img} />
              </div>
            ) : (
              <div>No More Story!</div>
            )
          )}
        </Carousel>
      </div>
    </Modal>
  );
};

export default StoryModal;
