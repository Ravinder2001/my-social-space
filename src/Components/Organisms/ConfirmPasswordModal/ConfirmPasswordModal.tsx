import React, { Dispatch, SetStateAction, useState } from "react";
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

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short")
      .max(20, "Too Long")
      .required("Confirm password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <Modal
      title="Add Password"
      open={ConfirmModal}
      onOk={handleConfirmModal}
      onCancel={handleConfirmModal}
      footer={null}
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
                type="password"
                onChange={handleChange}
              />
            </div>
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}
            <div className={styles.input_box}>
              <InputLabel1
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className={styles.error}>{errors.confirmPassword}</div>
            ) : null}

            <button type="submit" className={styles.button}>Submit</button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ConfirmPasswordModal;
