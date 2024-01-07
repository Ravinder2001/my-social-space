import React from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
type props = {
  friend: {
    id: string;
    job: string;
    name: string;
    profile_picture: string;
  };
};
function FriendBox(props: props) {
  const navigate = useNavigate();
  const { profile_picture, id, job, name } = props.friend;
  const handleClick = () => {
    navigate(`?user=${id}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <img src={profile_picture} alt="" className={styles.img} />

      <div className={styles.name}>{name}</div>
      <div className={styles.sub}>{job}</div>
    </div>
  );
}

export default FriendBox;
