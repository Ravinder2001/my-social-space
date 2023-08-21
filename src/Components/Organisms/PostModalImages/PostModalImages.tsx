import React, { useState } from "react";
import styles from "./style.module.scss";
import PostHeader from "../PostHeader/PostHeader";
import PostCaption from "../PostCaption/PostCaption";

type props = {
  data: {
    user_name: string;
    profile_picture: string;
    created_at: string;
    caption: string;
    images: { image_url: string }[];
  };
  editable: boolean;
};
function PostModalImages(props: props) {
  const { data, editable } = props;
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.top_box}>
        <PostHeader
          editable={editable}
          user_name={data?.user_name}
          profile_picture={data?.profile_picture}
          created_at={data?.created_at}
        />
        <PostCaption Caption={data.caption} />
      </div>
      <div className={styles.bottom_box}>
        <div className={styles.left_box}>
          {data.images.map((image, index) => (
            <img
              src={image.image_url}
              alt=""
              className={`${styles.img} ${
                selectedImage == index && styles.img_selected
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
        <div className={styles.right_box}>
          <img
            src={data.images[selectedImage].image_url}
            alt=""
            className={styles.big_img}
          />
        </div>
      </div>
    </div>
  );
}

export default PostModalImages;
