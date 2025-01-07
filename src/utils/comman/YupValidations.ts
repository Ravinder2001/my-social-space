import * as Yup from "yup";
import Constants from "../constants/Constant";

const emailValidation = Yup.string().email("Invalid email").required("Email is required");

const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .max(50, "Password must be at most 50 characters long")
  .matches(
    Constants.PASSWORD_REGEX,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
  )
  .required("Password is required");

const YupSchema = {
  emailValidation, // Exported for reuse
  passwordValidation, // Exported for reuse
  userLoginSchema: Yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
    rememberMe: Yup.boolean(),
  }),
  userRegisterSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long")
      .matches(
        Constants.PASSWORD_REGEX,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),

    termsAndConditions: Yup.boolean().oneOf([true], "You must accept the terms and conditions").required("Terms and conditions are required"),
    gender: Yup.string().oneOf(["M", "F", "O"], "Invalid gender").required("Gender is required"),
  }),
};

export default YupSchema;
