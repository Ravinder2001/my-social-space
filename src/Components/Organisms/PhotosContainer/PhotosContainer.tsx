import Gallery from "react-photo-gallery";

import  { useState } from "react";

import Data from "../../../data.json";
import PostModal from "../PostModal/PostModal";

import styles from "./styles.module.scss";

function PhotosContainer() {
  const images = Data.images;
  const [open, setOpen] = useState(false);
  

  const handleModal = () => {
    setOpen(!open);
  };

  const handleClick = (event: any, photo: any) => {
    console.log("id", photo.photo.post_id);
  };
  return (
    <div className={styles.container}>
      <Gallery photos={images} direction="row" onClick={handleModal} />
      <PostModal handleModal={handleModal} open={open} />
    </div>
  );
}

export default PhotosContainer;
