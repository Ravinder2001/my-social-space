import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "../Image/Image";
import styles from "./style.module.css";

import showToast from "../../utils/toastUtils";
import ImagePreview from "../ImagePreview/ImagePreview";
import CaptionGenerator from "../CaptionGenerator/CaptionGenerator";
import SelectBox from "../SelectBox/SelectBox";
import LucideIcon from "../../assets/Icons/LucideIcons";
import ToggleBtn from "../ToggleBtn/ToggleBtn";
import BasicDateTimePicker from "../DateTimePicker/DateTimePicker";

let visibiltyOptions = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Private",
    value: "private",
  },
  {
    label: "Friends",
    value: "friends",
  },
];

function PostUpload() {
  const btnRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toggleValues, setToggleValues] = useState<{ isLikeAllowed: boolean , isCommentAllowed: boolean }>({
    isLikeAllowed: false,
    isCommentAllowed: false,
  });

  const [caption, setCaption] = useState<string>("");
  const [visibiltyType, setVisibilityType] = useState<{ label: string; value: string } | undefined>(visibiltyOptions[0]);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleVisibilityType = (event: string | number) => {
    const selectedOption = visibiltyOptions.find((item) => item.value == event);
    setVisibilityType(selectedOption);
  };

  const handleUploadImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const filesArray = Array.from(e.target.files);
      const totalImages = images.length + filesArray.length;

      if (totalImages > 5) {
        showToast("You can upload up to 5 images only", "error");
        return;
      }

      let stack: string[] = [];
      filesArray.map((file, index) => {
        stack.push(URL.createObjectURL(file));
      });

      setImages([...images, ...stack]);
    }
  };

  const handleOpenUpload = () => {
    if (btnRef) {
      btnRef?.current?.click();
    }
  };

  const handleToggleValues = (event: ChangeEvent<HTMLInputElement>) => {
    setToggleValues((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <Image src="https://cdn-icons-png.flaticon.com/256/5556/5556468.png" />
          <div className={styles.headerLabel}>
            <div className={styles.name}>Ravinder Singh Negi</div>
          </div>
        </div>
        <SelectBox value={visibiltyType} options={visibiltyOptions} onChange={handleVisibilityType} />
      </div>
      <textarea name="" id="" rows={5} className={styles.textarea} placeholder="What's in your mind!"></textarea>
      <div className={styles.uploadImageBox}>
        {images.length < 5 ? (
          <div className={styles.uploadBtn} onClick={handleOpenUpload}>
            <LucideIcon name="Upload" />
            <div className={styles.uploadText}>Upload Images</div>
          </div>
        ) : null}
        <div style={{ width: images.length < 5 ? "75%" : "100%" }} className={styles.imageListBox}>
          <ImagePreview images={images} />
        </div>
      </div>
      <div className={styles.scheduleBox}>
        <div className={styles.label}>Schedule Post</div>
        <BasicDateTimePicker />
      </div>
      <div className={styles.optionBox}>
        <div className={styles.privacyBox}>
          <div className={styles.box}>
            <div className={styles.label}>Disable Comments</div>
            <ToggleBtn isChecked={toggleValues.isLikeAllowed} onChange={handleToggleValues} name="isLikeAllowed" />
          </div>
          <div className={styles.box}>
            <div className={styles.label}>Disable Likes</div>
            <ToggleBtn isChecked={toggleValues.isCommentAllowed} onChange={handleToggleValues} name="isCommentAllowed" />
          </div>
        </div>
        <div className={styles.aiBtn} onClick={handleModal}>
          <LucideIcon name="Bot" />
          <span>Generate Caption</span>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <div className={styles.resetBtn}>Reset</div>
        <div className={styles.submitBtn}>Submit</div>
      </div>
      <input style={{ display: "none" }} type="file" ref={btnRef} multiple max={5} onChange={handleUploadImages} />
      <CaptionGenerator isOpen={isOpen} handleModal={handleModal} setCaption={setCaption} />
    </div>
  );
}

export default PostUpload;
