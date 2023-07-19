import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputLabel1 from "../../Molecules/InputLabel/InputLabel1/InputLabel1";

type ConfirmModalType = {
  handleConfirmModal: () => void;
  ConfirmModal: boolean;
};

const ConfirmPasswordModal = (props: ConfirmModalType) => {
  const { ConfirmModal, handleConfirmModal } = props;

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

  return (
    <Modal
      title="Add Password"
      open={ConfirmModal}
      onOk={handleConfirmModal}
      onCancel={handleConfirmModal}
      footer={null}
      className={styles.modal}
      centered
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
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
