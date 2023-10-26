import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import GetPostLikes from "../../../APIs/GetPostLikes";
import { Request_Succesfull } from "../../../Utils/Constant";
import RemovePostLike from "../../../APIs/RemovePostLike";
import AddPostLike from "../../../APIs/AddPostLike";
import LikeModal from "../LikeModal/LikeModal";
import { socket } from "../../../socket";

type props = {
  handleModal?: (e: string) => void;
  post_id: string;
  count: string;
  user_like: string;
  open: boolean;
  privacy: {
    like: boolean;
    share: boolean;
  };
};

function PostImpression(props: props) {
  const { handleModal, post_id, open, privacy, count, user_like } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const handleLikeModal = () => {
    setModalOpen(!modalOpen);
  };

  const ToogleLike = async () => {
    if (privacy.like) {
      if (user_like == "1") {
        const res = await RemovePostLike(post_id);
        if (res?.status == Request_Succesfull) {
          // FetchLikes();
          socket.emit("Like-Toogle", post_id);
        }
      } else {
        const res = await AddPostLike(post_id);
        if (res?.status == Request_Succesfull) {
          // FetchLikes();
          socket.emit("Like-Toogle", post_id);
        }
      }
    } else {
      alert("Admin has disabled like");
    }
  };
  useEffect(() => {
    socket.on("User-Not-Typing", () => {});
    return () => {
      socket.offAny();
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={`${styles.icon} ${user_like == "1" && styles.liked}`} onClick={ToogleLike}>
          <LucideIcons name="Heart" color="#494849" size={20} />
        </div>
        <div className={styles.text} onClick={() => Number(count) >= 1 && handleLikeModal()}>
          {Number(count) == 0 ? "Like" : Number(count) == 1 ? `${count} Like` : `${count} Likes`}
        </div>
      </div>
      <div className={styles.box} onClick={() => handleModal && handleModal(post_id ?? "")}>
        <div className={styles.icon}>
          <LucideIcons name="MessageCircleIcon" color="#494849" size={20} />
        </div>
        <div className={styles.text}>Comments</div>
      </div>
      {!open ? (
        <div className={styles.box} onClick={() => handleModal && handleModal(post_id ?? "")}>
          <div className={styles.icon}>
            <LucideIcons name="Hash" color="#494849" size={20} />
          </div>
          <div className={styles.text}>See Post</div>
        </div>
      ) : null}

      {post_id ? <LikeModal open={modalOpen} handleModal={handleLikeModal} post_id={post_id} /> : null}
    </div>
  );
}

export default PostImpression;
