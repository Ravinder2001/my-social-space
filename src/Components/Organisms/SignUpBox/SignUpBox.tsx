import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputLabel1 from "../../Molecules/InputLabel/InputLabel1/InputLabel1";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import ConfirmPasswordModal from "../ConfirmPasswordModal/ConfirmPasswordModal";
import { auth, googleAuth } from "../../../firebase.config";
import { message } from "antd";
import RegisterWithEmailAndPassword from "../../../APIs/RegisterWithEmailAndPassword";
import { LocalStorageKey, Request_Succesfull } from "../../../Utils/Constant";
import { useNavigate } from "react-router-dom";
import { JWT_Decode } from "../../../Utils/Function";
import { LoginUser } from "../../../store/Slices/UserSlice";
import { useDispatch } from "react-redux";
import Loader1 from "../../Atoms/Loader/Loader1/Loader1";
import Loader2 from "../../Atoms/Loader/Loader2/Loader2";
function SignUpBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [PasswordView, setPasswordView] = useState({
    password: false,
    confirmPassword: false,
  });
  const [PasswordType, setPasswordType] = useState({
    password: "password",
    confirmPassword: "password",
  });

  const [ConfirmModal, setConfirmModal] = useState(false);
  const [EmailLoader, setEmailLoader] = useState(false);
  const [TokenLoader, setTokenLoader] = useState(false);

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

  const handleGmailVerification = async (email: string) => {
    try {
      const signInMethods = await auth.fetchSignInMethodsForEmail(email);
      return signInMethods.length;
    } catch (err) {
      return false;
    }
  };

  const handleRegisterWithEmailAndPassword = async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    const res = await RegisterWithEmailAndPassword({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (res.status === Request_Succesfull) {
      const decode = JWT_Decode(res.token);
      dispatch(LoginUser(decode));
      localStorage.setItem(LocalStorageKey, res.token);
      setEmailLoader(false);
      navigate("/");
      message.success("Welcome to My Social Space");
    } else {
      setEmailLoader(false);
      message.error(res.response.data.message);
    }
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
        {TokenLoader && (
          <div className={styles.loader}>
            <Loader2 />
          </div>
        )}
        <div className={styles.heading}>Create An Account</div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={async (values) => {
            setEmailLoader(true);
            if (await handleGmailVerification(values.email)) {
              handleRegisterWithEmailAndPassword(values);
            } else {
              setEmailLoader(false);
              message.error("Please enter a valid email");
            }
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
                  max_length={255}
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
                  max_length={255}
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
                  PasswordView={PasswordView.confirmPassword}
                  setPasswordView={setPasswordView}
                  onChange={handleChange}
                  max_length={20}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.error}>{errors.confirmPassword}</div>
              ) : null}

              <button className={styles.button} type="submit">
                {EmailLoader ? <Loader1 /> : "Sign Up"}
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
        setTokenLoader={setTokenLoader}
        ConfirmModal={ConfirmModal}
      />
    </>
  );
}

export default SignUpBox;
