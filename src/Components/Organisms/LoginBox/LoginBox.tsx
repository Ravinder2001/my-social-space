import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputLabel1 from "../../Molecules/InputLabel/InputLabel1/InputLabel1";
import RememberMe from "../../Molecules/RememberMe/RememberMe";
import { Formik, Form } from "formik";
import * as Yup from "yup";
function LoginBox() {
  const [PasswordView, setPasswordView] = useState(false);
  const [PasswordType, setPasswordType] = useState("password");

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(8, "Too Short")
      .max(20, "Too long")
      .required("Password is required"),
  });

  useEffect(() => {
    if (PasswordView) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }, [PasswordView]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Accout Login</div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
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
              />
            </div>
            {errors.email && touched.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
            <div className={styles.input_box}>
              <InputLabel1
                name="password"
                label="Password"
                type={PasswordType}
                PasswordView={PasswordView}
                setPasswordView={setPasswordView}
                onChange={handleChange}
              />
            </div>
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}
            <div className={styles.forgot_box}>
              <RememberMe />
              <div className={styles.forgot_text}>Forgot Password?</div>
            </div>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      <div className={styles.line}></div>
      <div className={styles.google}>Login with Google</div>
    </div>
  );
}

export default LoginBox;
