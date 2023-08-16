import { useState, useEffect } from "react";
import GetPostLikes from "../../../APIs/GetPostLikes";
import { Request_Succesfull } from "../../../Utils/Constant";
import LucideIcons from "../../../Utils/Icons/LucideIcons";

import styles from "./styles.module.scss";
import LikeModal from "../../Organisms/LikeModal/LikeModal";
import AddPostLike from "../../../APIs/AddPostLike";
import RemovePostLike from "../../../APIs/RemovePostLike";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
type PostImpressionProps = {
  handleModal: (e: string) => void;
  post_id: string;
};
type likeListType = {
  username: string;
  image_url: string;
};
function PostImpression(props: PostImpressionProps) {
  const User = useSelector((state: RootState) => state.UserReducer);
  const [likeList, setLikeList] = useState<likeListType[]>([]);
  const [userLike, setUserLike] = useState(false);
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    if (likeList.length) {
      setOpen(!open);
    }
  };
  const fetchLikes = async () => {
    const res = await GetPostLikes(props.post_id);
    if (res.status == Request_Succesfull) {
      setLikeList(res.data.list);
      setUserLike(res.data.user_like);
    }
  };
  const AddLike = async () => {
    const res = await AddPostLike({
      post_id: props.post_id,
      user_id: User.id,
    });
    if (res.status == Request_Succesfull) {
      fetchLikes();
    }
  };
  const RemoveLike = async () => {
    const res = await RemovePostLike({
      post_id: props.post_id,
      user_id: User.id,
    });
    if (res.status == Request_Succesfull) {
      fetchLikes();
    }
  };

  const handleLikeFunc = () => {
    if (userLike) {
      RemoveLike();
    } else {
      AddLike();
    }
  };
  useEffect(() => {
    fetchLikes();
  }, [props.post_id]);
  return (
    <div className={styles.container}>
      <div className={userLike ? styles.like : styles.unLike}>
        <div onClick={handleLikeFunc} className={styles.like_icon}>
          <LucideIcons name="Heart" color="#e60f0f" size={22} />
        </div>

        <div className={styles.text} onClick={handleModal}>
          {likeList.length ? "Likes" : "Like"}{" "}
          {likeList.length ? <>({likeList.length})</> : null}
        </div>
      </div>
      <div
        className={styles.comments}
        onClick={() => props.handleModal(props.post_id)}
      >
        <LucideIcons name="MessageCircleIcon" color="#a59393" size={22} />
        <div className={styles.text}>Comments (10)</div>
      </div>
      <div
        className={styles.see}
        onClick={() => props.handleModal(props.post_id)}
      >
        <LucideIcons name="Hash" color="#a59393" size={18} />
        <div className={styles.text}>See Post</div>
      </div>
      <LikeModal open={open} handleModal={handleModal} list={likeList} />
    </div>
  );
}

export default PostImpression;
