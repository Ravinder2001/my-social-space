import React, {
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import CaptionBox from "../../Molecules/CaptionBox/CaptionBox";
import styles from "./style.module.scss";

import { nanoid } from "nanoid";
import { message } from "antd";
import {
  BlobToFile,
  Image_Compresser,
  base64toFileWithDimensions,
  getImageDimensions,
} from "../../../Utils/Function";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddPost from "../../../APIs/AddPost";
import { ImageSizeError } from "../../../Utils/Message";
import {
  File_Extension,
  Image_Output_Format,
  Max_Image_Upload_Size,
  Request_Succesfull,
} from "../../../Utils/Constant";
import PostImages from "../PostImages/PostImages";
import PostPrivacy from "../../Molecules/PostPrivacy/PostPrivacy";
import GetEditPostData from "../../../APIs/GetEditPostData";
import InfinityLoader from "../../Atoms/Loader/InfinityLoader/InfinityLoader";
import UpdatePost from "../../../APIs/UpdatePost";
type props = {
  isEdit: {
    edit: boolean;
    post_id: string;
  };
};
const VisibilityOptions = [
  { value: "public", label: "Public" },
  { value: "friends", label: "Friends" },
  { value: "private", label: "Private" },
];
function AddPostBox(props: props) {
  const inputref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputref) {
      inputref.current?.click();
    }
  };
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [carouselImages, setCarouselImages] = useState<{ image_url: string }[]>(
    []
  );
  const [caption, setCaption] = useState<string>("");
  const [Values, setValues] = useState({
    comment: true,
    like: true,
    share: true,
  });
  const [visibility, setVisibility] = useState<{
    value: string;
    label: string;
  }>(VisibilityOptions[0]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToogle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };
  const handleCaption = (text: string) => {
    setCaption(text);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      console.log("🚀  file: AddPostBox.tsx:35  fileArray:", fileArray);
      setUploadedImages((prev) => [...prev, ...fileArray]);
    }
  };

  const handlePost = async () => {
    setLoading(true);
    let image_stack: any = [];

    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map(async (image, index) => {
          try {
            const ModifiedImage = await getImageDimensions(image);
            let object = {
              file: image,
              width: ModifiedImage.width,
              height: ModifiedImage.height,
              type: Image_Output_Format,
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
      formdata.append("comment", Values.comment ? "1" : "0");
      formdata.append("like", Values.like ? "1" : "0");
      formdata.append("share", Values.share ? "1" : "0");
      formdata.append("visibility", visibility.value);
      const image_res = await AddPost({ formdata: formdata });
      if (image_res?.status === 200) {
        message.success(image_res?.message);
      }
      setLoading(false);
    }
  };
  const handleEdit = async () => {
    console.log("values",Values)
    setLoading(true);
    const res = await UpdatePost({
      post_id: props.isEdit.post_id,
      data: {
        caption: caption,
        comment: Values.comment,
        like: Values.like,
        share: Values.share,
        visibility: visibility.value,
      },
    });
    if (res?.status == Request_Succesfull) {
      message.success(res?.message);
    }
    setLoading(false);
  };

  const FetchEditPostDetails = async () => {
    const res = await GetEditPostData(props.isEdit.post_id);
    if (res?.status === Request_Succesfull) {
      console.log("res", res?.data);
      setCaption(res?.data?.caption);
      setValues({
        like: res?.data.like_allowed,
        comment: res?.data.comment_allowed,
        share: res?.data.share_allowed,
      });
      setVisibility({
        label: res?.data.visibility,
        value: res?.data.visibility,
      });
      setCarouselImages(res?.data?.images);
      setLoading(false)
    }
  };

  useEffect(() => {
    uploadedImages.map((image) => {
      setCarouselImages((prev) => [
        ...prev,
        { image_url: URL.createObjectURL(image) },
      ]);
    });
  }, [uploadedImages]);

  useEffect(() => {
    if (props.isEdit.edit) {
      setLoading(true)
      FetchEditPostDetails();
    }
  }, [props.isEdit.edit]);
  return (
    <div className={styles.container}>
      {loading ? <InfinityLoader /> : null}

      <div className={styles.left_box}>
        <div className={styles.main_heading}>
          {props.isEdit ? "Edit Post" : "Add Post"}
        </div>
        <div className={styles.caption_container}>
          <CaptionBox value={caption} handleCaption={handleCaption} />
        </div>
        <div className={styles.add_container}>
          <div className={styles.heading}>Add Images</div>
          <div className={styles.add_box}>
            {!props.isEdit.edit && (
              <div
                className={`${styles.add_button} ${
                  !uploadedImages.length && styles.with_image_add_button
                }`}
                onClick={handleClick}
              >
                {!uploadedImages.length ? "Add Image" : "Add more images"}
              </div>
            )}

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
              {uploadedImages.length || carouselImages.length ? (
                <PostImages images={carouselImages} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right_box}>
        <PostPrivacy
          handleEdit={handleEdit}
          handlePost={handlePost}
          edit={props.isEdit.edit}
          Values={Values}
          handleToogle={handleToogle}
          VisibilityOptions={VisibilityOptions}
          value={visibility}
          setVisibilityOptions={setVisibility}
        />
      </div>
    </div>
  );
}

export default AddPostBox;
