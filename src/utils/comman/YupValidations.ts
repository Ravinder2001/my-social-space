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
};

export default YupSchema;
