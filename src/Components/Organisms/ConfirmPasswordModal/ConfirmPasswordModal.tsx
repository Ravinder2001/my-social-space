import * as Yup from "yup";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, message } from "antd";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputLabel1 from "../../Molecules/InputLabel/InputLabel1/InputLabel1";
import RegisterWithToken from "../../../APIs/RegisterWithToken";

import { LocalStorageKey, Request_Succesfull } from "../../../Utils/Constant";
import { auth, googleAuth } from "../../../firebase.config";
import { JWT_Decode } from "../../../Utils/Function";
import { LoginUser } from "../../../store/Slices/UserSlice";

import styles from "./styles.module.scss";

type ConfirmModalType = {
  handleConfirmModal: () => void;
  ConfirmModal: boolean;
  setTokenLoader: Dispatch<SetStateAction<boolean>>;
};

const ConfirmPasswordModal = (props: ConfirmModalType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ConfirmModal, handleConfirmModal, setTokenLoader } = props;

  const [PasswordView, setPasswordView] = useState({
    password: false,
    confirmPassword: false,
  });
  const [PasswordType, setPasswordType] = useState({
    password: "password",
    confirmPassword: "password",
  });

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short")
      .max(20, "Too Long")
      .required("Confirm password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values: { password: string }) => {
    auth.signInWithPopup(googleAuth).then((response) => {
      if (response) {
        response.user?.getIdToken().then(async (token) => {
          const res = await RegisterWithToken({
            token,
            password: values.password,
          });
          if (res.status === Request_Succesfull) {
            const decode = JWT_Decode(res.token);
            dispatch(LoginUser(decode));
            localStorage.setItem(LocalStorageKey, res.token);
            navigate("/");
            message.success("Welcome to My Social Space");
          } else {
            message.error(res.response.data.message);
          }
          handleConfirmModal();
        });
      }
    });
  };

  useEffect(() => {
    if (PasswordView.password) {
      setPasswordType((prev) => ({ ...prev, password: "text" }));
    }
    if (!PasswordView.password) {
      setPasswordType((prev) => ({ ...prev, password: "password" }));
    }
    if (PasswordView.confirmPassword) {
      setPasswordType((prev) => ({ ...prev, confirmPassword: "text" }));
    }
    if (!PasswordView.confirmPassword) {
      setPasswordType((prev) => ({ ...prev, confirmPassword: "password" }));
    }
  }, [PasswordView]);

  useEffect(() => {
    if (ConfirmModal) {
      setTokenLoader(true);
    } else {
      setTokenLoader(false);
    }
  }, [ConfirmModal]);

  return (
    <Modal
      title="Add Password"
      open={ConfirmModal}
      onCancel={handleConfirmModal}
      footer={null}
      className={styles.modal}
      centered
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, handleChange, touched }) => (
          <Form>
            <div className={styles.input_box}>
              <InputLabel1
                name="password"
                label="Password"
                type={PasswordType.password}
                onChange={handleChange}
                PasswordView={PasswordView.password}
                setPasswordView={setPasswordView}
                max_length={20}
              />
            </div>
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}
            <div className={styles.input_box}>
              <InputLabel1
                name="confirmPassword"
                label="Confirm Password"
                type={PasswordType.confirmPassword}
                onChange={handleChange}
                PasswordView={PasswordView.confirmPassword}
                setPasswordView={setPasswordView}
                max_length={20}
              />
            </div>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className={styles.error}>{errors.confirmPassword}</div>
            ) : null}

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ConfirmPasswordModal;
