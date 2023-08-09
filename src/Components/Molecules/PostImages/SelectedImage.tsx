import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface Photo {
  src: string;
  width: number;
  height: number;
  title?: string;
}

interface SelectedImageProps {
  index: number;
  photo: Photo;
  margin: string;
  direction?: string;
  top: number;
  left: number;
  selected: boolean;
  image_key: string;
  setSelectedImages?: Dispatch<SetStateAction<string[]>>;
  selectedImages?: string[];
}

const Checkmark: React.FC<{ selected: boolean }> = ({ selected }) => (
  <div
    style={
      selected
        ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "white", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "#06befa", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  left: "0px",
  top: "0px",
};

const SelectedImage: React.FC<SelectedImageProps> = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  selected,
  image_key,
  selectedImages,
  setSelectedImages,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  // calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  const selectedImgStyle = {
    transform: `translateZ(0px) scale3d(${sx}, ${sy}, 1)`,
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  };

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = `${left}px`;
    cont.top = `${top}px`;
  }

  const handleOnClick = (): void => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    if (selectedImages) setIsSelected(selectedImages.includes(image_key));
  }, [selectedImages, image_key]);
  useEffect(() => {
    if (setSelectedImages && isSelected) {
      setSelectedImages((prev) => [...prev, image_key]);
    }
    if (setSelectedImages && !isSelected) {
      setSelectedImages((prev) => {
        if (!prev.includes(image_key)) {
          return [...prev, image_key];
        } else {
          return prev.filter((item) => item !== image_key);
        }
      });
    }
  }, [isSelected]);

  return (
    <div
      style={{
        margin: margin,
        height: photo.height,
        width: photo.width,
        backgroundColor: "#eee",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        borderRadius:"8px"
      }}
      className={!isSelected ? "not-selected" : ""}
    >
      <Checkmark selected={isSelected ? true : false} />
      <img
        alt={photo.title}
        style={
          isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
        }
        {...photo}
        onClick={handleOnClick}
      />
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

export default SelectedImage;
