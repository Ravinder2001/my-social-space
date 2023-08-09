import React, { ChangeEvent, useRef, useState } from "react";
import CaptionBox from "../../Molecules/CaptionBox/CaptionBox";
import styles from "./style.module.scss";
import PostImages from "../../Molecules/PostImages/PostImages";
import { PhotoProps } from "react-photo-gallery";
import { nanoid } from "nanoid";
import { message } from "antd";
import { Image_Compresser } from "../../../Utils/Function";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddPost from "../../../APIs/AddPost";
import { ImageSizeError } from "../../../Utils/Message";
import { File_Extension, Max_Image_Size } from "../../../Utils/Constant";
function AddPostBox() {
  const inputref = useRef<HTMLInputElement>(null);
  const User_id = useSelector((state: RootState) => state.UserReducer.id);

  const handleClick = () => {
    if (inputref) {
      inputref.current?.click();
    }
  };
  const [uploadedImages, setUploadedImages] = useState<PhotoProps[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");

  function BlobToFile(blobUrl: string, fileName: string): Promise<File> {
    return fetch(blobUrl)
      .then((response) => response.blob())
      .then(
        (blobData) => new File([blobData], fileName, { type: blobData.type })
      );
  }

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const selected: PhotoProps[] = [];
      let over_size_image = false;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size < Max_Image_Size * 1024 * 1024) {
          const url = URL.createObjectURL(file);
          const img = new Image();
          await new Promise<void>((resolve) => {
            img.onload = () => {
              selected.push({
                src: url,
                width: img.width,
                height: img.height,
                key: nanoid(),
                alt: file.name,
              });
              resolve();
            };
            img.src = url;
          });
        } else {
          over_size_image = true;
        }
      }
      if (over_size_image) {
        message.error(ImageSizeError);
      }
      setUploadedImages((prev) => [...prev, ...selected]);
    }
  };
  const handleDelete = () => {
    console.log(selectedImages);
    const filteredImages = uploadedImages.filter(
      (el) => el.key && !selectedImages.includes(el?.key)
    );
    console.log("🚀  file: AddPostBox.tsx:45  filteredImages:", filteredImages);
    setUploadedImages(filteredImages);
  };
  const handlePost = async () => {
    let image_stack: any = [];
    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map(async (image, index) => {
          try {
            const convertedFile = await BlobToFile(
              image.src,
              image.alt ?? `image_${index}.png`
            );

            let object = {
              file: convertedFile,
              width: image.width,
              height: image.height,
              type: image.alt?.split(".")[1] ?? "JPEG",
            };
            const newImage = await Image_Compresser(object);
            image_stack.push(newImage);
          } catch (error) {
            console.error("Error converting Blob to File:", error);
          }
        })
      );
    }

    if (caption.length > 0 || image_stack.length) {
      let formdata = new FormData();
      if (image_stack.length) {
        image_stack.map((image: any) => {
          formdata.append(File_Extension, image);
        });
      }

      formdata.append("caption", caption);
      const image_res = await AddPost({ id: User_id, formdata: formdata });
      message.success(image_res.message);
    }
  };
  const handleCaption = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_box}>
        <div>
          <CaptionBox handleCaption={handleCaption} />
        </div>
        <div>
          <div>Add Images</div>
          <div className={styles.add_box}>
            <div className={styles.delete_container}>
              <div
                className={
                  uploadedImages.length
                    ? styles.with_image_add_button
                    : styles.add_button
                }
                onClick={handleClick}
              >
                Add Image
              </div>
              {uploadedImages.length && (
                <div className={styles.delete} onClick={handleDelete}>
                  Delete
                </div>
              )}
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
              {uploadedImages.length && (
                <PostImages
                  Images={uploadedImages}
                  setSelectedImages={setSelectedImages}
                  selectedImages={selectedImages}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right_box}>
        <button className={styles.delete} onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default AddPostBox;
