import * as Yup from "yup";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { Modal, message } from "antd";

import styles from "./styles.module.scss";
import AddProfileData from "../../../APIs/AddProfileData";
import { Request_Succesfull } from "../../../Utils/Constant";
import { useDispatch } from "react-redux";
import { AddPicture } from "../../../store/Slices/UserSlice";

type AddProfilePictureModalType = {
  open: boolean;
  closeable: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddProfilePictureModal = (props: AddProfilePictureModalType) => {
  const { open, setOpen, closeable } = props;
  const dispatch = useDispatch();

  const handleModal = () => {
    setOpen(!open);
  };
  const [preview, setPreview] = useState<string | null>(null);

  function onClose(): void {
    setPreview(null);
  }

  function onCrop(pv: string): void {
    setPreview(pv);
  }

  function onBeforeFileLoad(elem: React.ChangeEvent<HTMLInputElement>): void {
    if (elem.target.files && elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  const handleSave = async () => {
    if (preview) {
      const fileName = "image.png"; // set a file name for the uploaded image
      const mimeType = "image/png"; // set the MIME type of the uploaded image
      const file = base64toFile(preview, fileName, mimeType);
      const formData = new FormData();
      formData.append("image", file, file.name);
      const res = await AddProfileData({ formdata: formData });
      if (res?.status == Request_Succesfull) {
        dispatch(AddPicture(res.data));
        setOpen(false);
        message.success("Profile Added Successfully");
      }
    }
  };

  function base64toFile(
    base64String: string,
    fileName: string,
    mimeType: string
  ): File {
    const arr = base64String.split(",");
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
  }
  return (
    <Modal
      title="Add Profile Picture"
      open={open}
      onCancel={handleModal}
      footer={null}
      cancelButtonProps={{ style: { display: "none" } }}
      className={styles.modal}
      // centered
      maskClosable={false}
      closable={closeable}
    >
      <div>
        <Avatar
          width={220}
          height={220}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={undefined}
        />
        {preview && (
          <div>
            {" "}
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button onClick={handleSave}>Upload</button>
      </div>
    </Modal>
  );
};

export default AddProfilePictureModal;
