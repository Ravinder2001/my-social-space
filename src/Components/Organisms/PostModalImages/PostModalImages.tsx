import React, { useState } from "react";
import styles from "./style.module.scss";
import PostHeader from "../PostHeader/PostHeader";
import PostCaption from "../PostCaption/PostCaption";

function PostModalImages() {
  let images = [
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_2.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230821T054352Z&X-Amz-Expires=86400&X-Amz-Signature=dc1a701f8824ea8d0ab82b9089327590d0bfeb35800053d6b01b486c6a1cbada&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_2.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230821T054352Z&X-Amz-Expires=86400&X-Amz-Signature=dc1a701f8824ea8d0ab82b9089327590d0bfeb35800053d6b01b486c6a1cbada&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_2.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230821%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230821T054352Z&X-Amz-Expires=86400&X-Amz-Signature=dc1a701f8824ea8d0ab82b9089327590d0bfeb35800053d6b01b486c6a1cbada&X-Amz-SignedHeaders=host&x-id=GetObject",
  ];
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.top_box}>
        <PostHeader />
        <PostCaption />
      </div>
      <div className={styles.bottom_box}>
        <div className={styles.left_box}>
          {images.map((image, index) => (
            <img
              src={image}
              alt=""
              className={`${styles.img} ${
                selectedImage == index && styles.img_selected
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
        <div className={styles.right_box}>
          <img src={images[selectedImage]} alt="" className={styles.big_img} />
        </div>
      </div>
    </div>
  );
}

export default PostModalImages;
