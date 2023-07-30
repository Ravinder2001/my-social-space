import { ChangeEvent, Dispatch, SetStateAction } from "react";

import InputBox1 from "../../../Atoms/InputBox/InputBox1/InputBox1";
import ReactIcons from "../../../../Utils/Icons/ReactIcons";

import styles from "./styles.module.scss";

type InputType = {
  name: string;
  label: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  setPasswordView?: Dispatch<
    SetStateAction<{ password: boolean; confirmPassword: boolean }>
  >;
  PasswordView?: boolean;
  max_length?: number;
};

function InputLabel1(props: InputType) {
  const {
    name,
    label,
    type,
    value,
    onChange,
    setPasswordView,
    PasswordView,
    max_length,
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>{label}</div>
        {PasswordView !== undefined && setPasswordView !== undefined && (
          <>
            {PasswordView ? (
              <div
                className={styles.icon}
                onClick={() =>
                  setPasswordView((prev) => ({
                    ...prev,
                    [name]: !PasswordView,
                  }))
                }
              >
                <ReactIcons name="AiFillEye" />
              </div>
            ) : (
              <div
                className={styles.icon}
                onClick={() =>
                  setPasswordView((prev) => ({
                    ...prev,
                    [name]: !PasswordView,
                  }))
                }
              >
                <ReactIcons name="AiFillEyeInvisible" />
              </div>
            )}
          </>
        )}
      </div>
      <InputBox1
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        max_length={max_length}
      />
    </div>
  );
}

export default InputLabel1;
