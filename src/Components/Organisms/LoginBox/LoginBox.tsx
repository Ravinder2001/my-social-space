import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputLabel1 from "../../Molecules/InputLabel/InputLabel1/InputLabel1";
import RememberMe from "../../Molecules/RememberMe/RememberMe";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { auth, googleAuth } from "../../../firebase.config";
import LoginWithToken from "../../../APIs/LoginWithToken";
import { LocalStorageKey, Request_Succesfull } from "../../../Utils/Constant";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import LoginWithEmailAndPassword from "../../../APIs/LoginWithEmailAndPassword";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../store/Slices/UserSlice";
import { JWT_Decode } from "../../../Utils/Function";
import Loader1 from "../../Atoms/Loader/Loader1/Loader1";
import Loader2 from "../../Atoms/Loader/Loader2/Loader2";
import { setIndex } from "../../../store/Slices/DrawerSlice";

function LoginBox() {
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
  const [RememberMeState, setRememberMeState] = useState<boolean>(false);
  const [EmailLoader, setEmailLoader] = useState(false);
  const [TokenLoader, setTokenLoader] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(8, "Too Short")
      .max(20, "Too long")
      .required("Password is required"),
  });

  const handleTokenLogin = () => {
    setTokenLoader(true);
    auth.signInWithPopup(googleAuth).then((res) => {
      if (res) {
        res.user?.getIdToken().then(async (token) => {
          const res = await LoginWithToken({ token });
          if (res.status === Request_Succesfull) {
            const decode = JWT_Decode(res.token);
            dispatch(LoginUser(decode));
      
            localStorage.setItem(LocalStorageKey, res.token);
            setTokenLoader(false);
            navigate("/");
            message.success("Welcome to My Social Space");
          } else {
            setTokenLoader(false);
            message.error(res.response.data.message);
          }
        });
      }
    });
  };
  const handleEmailLogin = async (values: {
    email: string;
    password: string;
  }) => {
    setEmailLoader(true);
    let data = {
      email: values.email,
      password: values.password,
      rememberMe: RememberMeState,
    };
    const res = await LoginWithEmailAndPassword(data);
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
  }, [PasswordView]);

  return (
    <div className={styles.container}>
      {TokenLoader && (
        <div className={styles.loader}>
          <Loader2 />
        </div>
      )}
      <div className={styles.heading}>Accout Login</div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          handleEmailLogin(values);
        }}
      >
        {({ errors, touched, handleChange }) => (
          <Form>
            <div className={styles.input_box}>
              <InputLabel1
                name="email"
                label="Email"
                type="text"
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
            <div className={styles.forgot_box}>
              <RememberMe
                setRememberMeState={setRememberMeState}
                RememberMeState={RememberMeState}
              />
              <div className={styles.forgot_text}>Forgot Password?</div>
            </div>
            <button type="submit" className={styles.button}>
              {EmailLoader ? <Loader1 /> : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <div className={styles.line}></div>
      <div className={styles.google} onClick={handleTokenLogin}>
        Login with Google
      </div>
    </div>
  );
}

export default LoginBox;
