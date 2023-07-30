import { useState, useCallback } from "react";
import Gallery, { PhotoClickHandler } from "react-photo-gallery";
import Carousel, { Modal, ModalGateway, ViewType } from "react-images";

import styles from "./styles.module.scss";

type PostCarouselProps = {
  Images: { src: string; width: number; height: number }[];
};

function PostImages(props: PostCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox: PhotoClickHandler<{}> = useCallback(
    (event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    },
    []
  );

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const views: ViewType[] = props.Images.map((x) => ({
    ...x,
    source: x.src,
  }));

  return (
    <div className={styles.container}>
      <Gallery photos={props.Images} direction="row" onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox} closeOnBackdropClick={true}>
            <Carousel currentIndex={currentImage} views={views} />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default PostImages;
