import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputLabel1 from "../../Molecules/InputLabel/InputLabel1/InputLabel1";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import ConfirmPasswordModal from "../ConfirmPasswordModal/ConfirmPasswordModal";
function SignUpBox() {
  const [PasswordView, setPasswordView] = useState({
    password: false,
    confirmPassword: false,
  });
  const [PasswordType, setPasswordType] = useState({
    password: "password",
    confirmPassword: "password",
  });

  const [ConfirmModal, setConfirmModal] = useState(false);

  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short")
      .max(20, "Too long")
      .required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(8, "Too Short")
      .max(20, "Too long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const handleConfirmModal = () => {
    setConfirmModal(!ConfirmModal);
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>Create An Account</div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched, handleChange }) => (
            <Form>
              <div className={styles.input_box}>
                <InputLabel1
                  name="name"
                  label="Name"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              {errors.name && touched.name ? (
                <div className={styles.error}>{errors.name}</div>
              ) : null}
              <div className={styles.input_box}>
                <InputLabel1
                  name="email"
                  label="Email"
                  type="email"
                  onChange={handleChange}
                />
              </div>
              {errors.email && touched.email ? (
                <div className={styles.error}>{errors.email}</div>
              ) : null}
              <div className={styles.input_box}>
                <InputLabel1
                  name="password"
                  label="Password"
                  type={PasswordType.password}
                  PasswordView={PasswordView.password}
                  setPasswordView={setPasswordView}
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
                  type={PasswordType.confirmPassword}
                  PasswordView={PasswordView.confirmPassword}
                  setPasswordView={setPasswordView}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.error}>{errors.confirmPassword}</div>
              ) : null}

              <button className={styles.button} type="submit">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <div className={styles.line}></div>
        <div className={styles.google} onClick={handleConfirmModal}>
          Sign Up with Google
        </div>
      </div>
      <ConfirmPasswordModal
        handleConfirmModal={handleConfirmModal}
        ConfirmModal={ConfirmModal}
      />
    </>
  );
}

export default SignUpBox;
