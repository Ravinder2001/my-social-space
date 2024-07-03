import React from "react";
import styles from "./style.module.scss";

type StoryType = {
  data: {
    profile_picture: string;
    username: string;
    user_id: string;
    story: { id: number; story_image: string; song: string; start_time: number; end_time: number; created_at: string }[];
  };
  handleClick: (data: any) => void;
};
function UserStoryBox(props: StoryType) {
  const { data, handleClick } = props;
  console.log("🚀  data:", data)
  function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div
      className={styles.container}
      style={{ borderColor: getRandomHexColor() }}
      onClick={() => {
        handleClick(data);
      }}
    >
      <div className={styles.img_box}>
        {data.story.length ?<img src={data.story[0].story_image} alt="" className={styles.img} />:null}
        
      </div>
      <div className={styles.user_img_box}>
        <img src={data.profile_picture} alt="" className={styles.user_img} />
      </div>
      {/* <div className={styles.name}>Ravinder Singh Negi</div> */}
    </div>
  );
}

export default UserStoryBox;
