import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import CaptionBox from "../../Molecules/CaptionBox/CaptionBox";
import styles from "./style.module.scss";

import { nanoid } from "nanoid";
import { message } from "antd";
import { BlobToFile, Image_Compresser } from "../../../Utils/Function";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddPost from "../../../APIs/AddPost";
import { ImageSizeError } from "../../../Utils/Message";
import { File_Extension, Max_Image_Upload_Size } from "../../../Utils/Constant";
import PostImages from "../PostImages/PostImages";
function AddPostBox() {
  const inputref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputref) {
      inputref.current?.click();
    }
  };
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");
  const handleCaption = (text: string) => {
    setCaption(text);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Convert FileList to an array of Files
      const fileArray = Array.from(files);
      setUploadedImages((prev) => [...prev, ...fileArray]);
    }
  };

  const handlePost = async () => {
    let image_stack: any = [];
    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map(async (image, index) => {
          try {
            // console.log("ayaa", image);

            // let object = {
            //   file: image,
            //   width: image.width,
            //   height: image.height,
            // };
            // const newImage = await Image_Compresser(object);
            // image_stack.push(newImage);
          } catch (error) {
            console.error("Error converting Blob to File:", error);
          }
        })
      );
    }

    // if (caption.length > 0 || image_stack.length) {
    //   let formdata = new FormData();
    //   if (image_stack.length) {
    //     image_stack.map((image: any) => {
    //       formdata.append(File_Extension, image);
    //     });
    //   }

    //   formdata.append("caption", caption);
    //   const image_res = await AddPost({ formdata: formdata });
    //   if (image_res?.status === 200) {
    //     message.success(image_res.message);
    //   }
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main_heading}>Add Post</div>
      <div className={styles.caption_container}>
        <CaptionBox value={caption} handleCaption={handleCaption} />
      </div>
      <div className={styles.add_container}>
        <div className={styles.heading}>Add Images</div>
        <div className={styles.add_box}>
          <div className={styles.delete_container}>
            <div
              className={`${styles.add_button} ${
                !uploadedImages.length && styles.with_image_add_button
              }`}
              onClick={handleClick}
            >
              {!uploadedImages.length ? "Add Image" : "Add more images"}
            </div>
            {uploadedImages.length ? (
              <div className={styles.delete}>Delete</div>
            ) : null}
          </div>

          <div style={{ display: "none" }}>
            <input
              onChange={handleImageSelect}
              ref={inputref}
              type="file"
              name=""
              id=""
              multiple
            />
          </div>
          <div className={styles.images_box}>
            {uploadedImages.length ? (
              <PostImages files={uploadedImages} />
            ) : null}
          </div>
        </div>
      </div>
      <button className={styles.post} onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default AddPostBox;
