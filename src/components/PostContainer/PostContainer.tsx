import React, { ChangeEvent } from "react";
import styles from "./style.module.css";
import Image from "../Image/Image";
import MenuBox from "../MenuBox/MenuBox";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import PostImpression from "../PostImpression/PostImpression";
import TextArea from "../TextArea/TextArea";
import DefaultBtn from "../Buttons/DefaultBtn/DefaultBtn";
function PostContainer() {
  let images = [
    "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrdmC6-g6JsFUdwXqtCtUuwNR1S7XpmU6BIhi5RiU-cDb8aaoJGHVAgPgYKJglcVGsMrwMRxaoP3yRiyCZ9xRcxY0iSt66ysCKlfMqHUE2&usqp=CAE",
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRW39YFdbEEG4tAVHLH6ksqIQfy5zlgiSNJUurLPKN5KLkcEQx7Ls4hqK0qeZQEMRfo5BeeThGIlrbXMi8trwrgaHzAdLrjvshS5tsPg1v0Y4LL36B_T1pQ6Vk&usqp=CAE",
  ];
  const handleComment = (event: ChangeEvent<HTMLTextAreaElement>) => {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <Image src="https://cdn-icons-png.flaticon.com/256/5556/5556468.png" />
          <div className={styles.headerLabel}>
            <div className={styles.name}>Ravinder Singh Negi</div>
            <div className={styles.time}>3 hours ago</div>
          </div>
        </div>
        <MenuBox />
      </div>
      <div className={styles.caption}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ipsam doloremque autem deleniti voluptates, ducimus numquam ipsum, deserunt
        nihil molestias facilis minus atque officia quos corrupti eaque esse sed porro.
      </div>
      <ImageCarousel images={images} />
      <PostImpression />
      <div className={styles.commentBox}>
        <TextArea value="" onChange={handleComment} name="comment" placeholder="Write the comment" rows={1}/>
        <DefaultBtn label="Submit" type="submit"/>
      </div>
    </div>
  );
}

export default PostContainer;
