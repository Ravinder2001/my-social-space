import { useState, useCallback, Dispatch, SetStateAction } from "react";
import Gallery, { PhotoClickHandler } from "react-photo-gallery";
import Carousel, { Modal, ModalGateway, ViewType } from "react-images";

import styles from "./styles.module.scss";
import SelectedImage from "./SelectedImage";
import { useLocation } from "react-router-dom";
import { Add_Route } from "../../../Utils/Constant";

type PostCarouselProps = {
  Images: { src: string; width: number; height: number; key?: string }[];
  setSelectedImages?: Dispatch<SetStateAction<string[]>>;
  selectedImages?:string[]
};

function PostImages(props: PostCarouselProps) {
  const location = useLocation();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const toggleSelectAll = (): void => {
    setSelectAll(!selectAll);
  };

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
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }: any) => {
      return (
        <SelectedImage
          selected={selectAll ? true : false}
          image_key={key}
          margin={"2px"}
          index={index}
          photo={photo}
          left={left}
          top={top}
          setSelectedImages={props.setSelectedImages}
          selectedImages={props.selectedImages}
        />
      );
    },
    [selectAll]
  );

  return (
    <div className={styles.container}>
      {location.pathname === Add_Route ? (
        <Gallery
          photos={props.Images}
          renderImage={imageRenderer}
          direction="row"
          onClick={openLightbox}
        />
      ) : (
        <Gallery photos={props.Images} direction="row" onClick={openLightbox} />
      )}

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
