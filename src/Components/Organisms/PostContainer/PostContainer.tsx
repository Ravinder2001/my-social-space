import React, { useState } from "react";
import styles from "./style.module.scss";
import PostHeader from "../PostHeader/PostHeader";
import PostCaption from "../PostCaption/PostCaption";
import PostImages from "../PostImages/PostImages";
import PostImpression from "../PostImpression/PostImpression";
import PostAddComments from "../PostAddComments/PostAddComments";
import PostModal from "../PostModal/PostModal";
function PostContainer() {
  let images = [
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
    "https://my-social-space.s3.ap-south-1.amazonaws.com/Posts/6f5d0def-62b9-4931-a2e9-538ec2ae693d/2d6196ff-a406-4f3e-a808-f3329afc5727/image_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATPQ4QJYNYR76XNJX%2F20230820%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230820T122611Z&X-Amz-Expires=86400&X-Amz-Signature=8ef44259b987e937ef1350911572e672320c506229ecda8ce9715bb4422a94f7&X-Amz-SignedHeaders=host&x-id=GetObject",
  ];

  const [open, setOpen] = useState<boolean>(true);
  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.container}>
      <PostHeader />
      <PostCaption />
      <PostImages images={images} />
      <PostImpression handleModal={handleModal} />
      <PostAddComments />
      <PostModal open={open} handleModal={handleModal} />
    </div>
  );
}

export default PostContainer;
