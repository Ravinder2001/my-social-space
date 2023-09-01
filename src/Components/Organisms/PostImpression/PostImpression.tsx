import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import GetPostLikes from "../../../APIs/GetPostLikes";
import { Request_Succesfull } from "../../../Utils/Constant";
import RemovePostLike from "../../../APIs/RemovePostLike";
import AddPostLike from "../../../APIs/AddPostLike";
import LikeModal from "../LikeModal/LikeModal";

type props = {
  handleModal?: (e: string) => void;
  post_id: string;
  open: boolean;
  privacy: {
    like: boolean;
    share: boolean;
  };
};

type impressionData = {
  list: { user_name: string; image_url: string }[];
  user_like: boolean;
};
function PostImpression(props: props) {
  const { handleModal, post_id, open, privacy } = props;
  const [impressionData, setImpressionData] = useState<impressionData>({
    list: [],
    user_like: false,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleLikeModal = () => {
    setModalOpen(!modalOpen);
  };

  const FetchLikes = async () => {
    const res = await GetPostLikes(post_id);
    if (res.status == Request_Succesfull) {
      setImpressionData(res.data);
    }
  };
  const ToogleLike = async () => {
    if (privacy.like) {
      if (impressionData?.user_like) {
        const res = await RemovePostLike(post_id);
        if (res?.status == Request_Succesfull) {
          FetchLikes();
        }
      } else {
        const res = await AddPostLike(post_id);
        if (res?.status == Request_Succesfull) {
          FetchLikes();
        }
      }
    } else {
      alert("Admin has disabled like");
    }
  };
  useEffect(() => {
    FetchLikes();
  }, [post_id]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div
          className={`${styles.icon} ${
            impressionData?.user_like && styles.liked
          }`}
          onClick={ToogleLike}
        >
          <LucideIcons name="Heart" color="#494849" size={22} />
        </div>
        <div
          className={styles.text}
          onClick={() => impressionData.list.length && handleLikeModal()}
        >
          {impressionData?.list.length == 0
            ? "Like"
            : impressionData?.list.length == 1
            ? `${impressionData?.list.length} Like`
            : `${impressionData?.list.length} Likes`}
        </div>
      </div>
      <div
        className={styles.box}
        onClick={() => handleModal && handleModal(post_id ?? "")}
      >
        <div className={styles.icon}>
          <LucideIcons name="MessageCircleIcon" color="#494849" size={22} />
        </div>
        <div className={styles.text}>Comments</div>
      </div>
      {!open ? (
        <div
          className={styles.box}
          onClick={() => handleModal && handleModal(post_id ?? "")}
        >
          <div className={styles.icon}>
            <LucideIcons name="Hash" color="#494849" size={22} />
          </div>
          <div className={styles.text}>See Post</div>
        </div>
      ) : null}

      <LikeModal
        open={modalOpen}
        handleModal={handleLikeModal}
        list={impressionData.list}
      />
    </div>
  );
}

export default PostImpression;
