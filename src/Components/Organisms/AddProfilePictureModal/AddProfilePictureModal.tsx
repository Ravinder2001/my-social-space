import * as Yup from "yup";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Avatar from "react-avatar-edit";
import { Modal, message } from "antd";

import styles from "./styles.module.scss";
import AddProfileData from "../../../APIs/AddProfileData";
import {
  File_Extension,
  Image_Output_Format,
  Max_Image_Upload_Size,
  Max_Server_Image_Upload_Size,
  Request_Succesfull,
} from "../../../Utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { AddPicture } from "../../../store/Slices/UserSlice";
import {
  Image_Compresser,
  base64toFileWithDimensions,
} from "../../../Utils/Function";
import InputBox1 from "../../Atoms/InputBox/InputBox1/InputBox1";
import GetProfileData from "../../../APIs/GetProfileData";
import { RootState } from "../../../store/store";
import invalid_user from "../../../Assets/Images/invalid_user.png";
import UpdateProfileData from "../../../APIs/UpdateProfileData";

type AddProfilePictureModalType = {
  open: boolean;
  closeable: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddProfilePictureModal = (props: AddProfilePictureModalType) => {
  const { open, setOpen, closeable } = props;
  const dispatch = useDispatch();
  const UserImage = useSelector((state: RootState) => state.UserReducer.image);

  const [preview, setPreview] = useState<string | null>(null);
  const [job, setJob] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [avatar, setImage] = useState<string>("");
  const [tempData, setTempData] = useState<{ job: string; location: string }>({
    job: "",
    location: "",
  });
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<boolean>(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleJob = (e: ChangeEvent<HTMLInputElement>) => {
    setJob(e.target.value);
  };
  const handleLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  function onClose(): void {
    setPreview(null);
  }

  function onCrop(pv: string): void {
    setPreview(pv);
  }

  function onBeforeFileLoad(elem: React.ChangeEvent<HTMLInputElement>): void {
    if (elem.target.files && elem.target.files[0]) {
      console.log(elem.target.files[0].size);
      const fileSizeInBytes = elem.target.files[0].size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert to MB

      if (fileSizeInMB > Max_Image_Upload_Size) {
        alert(
          `File is too big! Please select an image smaller than ${Max_Image_Upload_Size} MB.`
        );
        elem.target.value = "";
      }
    }
  }

  const FetchProfileData = async () => {
    const res = await GetProfileData();
    if (res?.status == Request_Succesfull) {
      setJob(res.data.job);
      setLocation(res.data.location);
      setTempData({ job: res.data.job, location: res.data.location });
    }
  };

  const handleSave = async () => {
    if (preview) {
      const fileName = "image.png"; // set a file name for the uploaded image
      const mimeType = "image/jpeg"; // set the MIME type of the uploaded image
      const ModifiedImage = await base64toFileWithDimensions(
        preview,
        fileName,
        mimeType
      );
      if (
        ModifiedImage?.file.size / (1024 * 1024) <=
        Max_Server_Image_Upload_Size
      ) {
        const formData = new FormData();
        formData.append("image", ModifiedImage.file, ModifiedImage.file.name);
        formData.append("job", job);
        formData.append("location", location);
        const res = await AddProfileData({ formdata: formData });
        if (res?.status == Request_Succesfull) {
          dispatch(AddPicture(res.data));
          setOpen(false);
          message.success("Profile Added Successfully");
        }
      } else {
        let object = {
          file: ModifiedImage.file,
          width: ModifiedImage.dimensions.width,
          height: ModifiedImage.dimensions.height,
          type: Image_Output_Format,
        };
        const newImage = await Image_Compresser(object);
        const formData = new FormData();
        formData.append(File_Extension, newImage);
        formData.append("job", job);
        formData.append("location", location);
        const res = await AddProfileData({ formdata: formData });
        if (res?.status == Request_Succesfull) {
          dispatch(AddPicture(res.data));
          setOpen(false);
          message.success("Profile Added Successfully");
        }
      }
    } else {
      if (isChanged) {
        const res = await UpdateProfileData({
          job: job,
          location: location,
          delete: avatar[0] == "d" ? true : false,
        });
        if (res?.status == Request_Succesfull) {
          if (avatar[0] == "d") {
            dispatch(AddPicture(invalid_user));
          }

          setOpen(false);
          message.success(res?.message);
        }
      } else {
        setOpen(false);
      }
    }
  };

  const handleNewImage = () => {
    setNewImage(true);
  };

  useEffect(() => {
    if (open) {
      FetchProfileData();
      setImage(UserImage);
    }
  }, [open]);
  useEffect(() => {
    if (job != tempData.job) {
      setIsChanged(true);
    }
    if (location != tempData.location) {
      setIsChanged(true);
    }
  }, [job, location, avatar]);

  return (
    <Modal
      title="Add Profile Information"
      open={open}
      onCancel={handleModal}
      footer={null}
      cancelButtonProps={{ style: { display: "none" } }}
      className={styles.modal}
      // centered
      maskClosable={false}
      closable={closeable}
    >
      <div className={styles.container}>
        {!newImage ? (
          <div className={styles.img_box}>
            <img src={avatar} alt="" className={styles.img} />

            <div className={styles.left_box}>
              <div className={styles.upload} onClick={handleNewImage}>
                Upload new Image
              </div>
              <div
                className={styles.remove}
                onClick={() => {
                  setImage(invalid_user);
                  setIsChanged(true);
                }}
              >
                Remove Profile Picture
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.avatar_box}>
            <Avatar
              width={220}
              height={220}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={undefined}
            />

            {preview && (
              <img src={preview} alt="Preview" className={styles.img} />
            )}
          </div>
        )}

        <div>
          <div className={styles.label}>Job</div>
          <InputBox1
            type="text"
            max_length={30}
            value={job}
            onChange={handleJob}
          />
        </div>
        <div>
          <div className={styles.label}>Location</div>
          <InputBox1
            type="text"
            max_length={30}
            value={location}
            onChange={handleLocation}
          />
        </div>

        <button className={styles.btn} onClick={handleSave}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default AddProfilePictureModal;
