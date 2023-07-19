import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import InputBox1 from "../../../Atoms/InputBox/InputBox1/InputBox1";
import styles from "./styles.module.scss";
import Icons from "../../../../Utils/ReactIcons/Icons";
type InputType = {
  name:string,
  label: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  setPasswordView?: Dispatch<SetStateAction<boolean>>;
  PasswordView?: boolean;
};

function InputLabel1(props: InputType) {
  const { name,label, type, value, onChange, setPasswordView, PasswordView } = props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>{label}</div>
        {PasswordView !== undefined && setPasswordView !== undefined && (
          <>
            {PasswordView ? (
              <div
                className={styles.icon}
                onClick={() => setPasswordView(!PasswordView)}
              >
                <Icons name="AiFillEye" />
              </div>
            ) : (
              <div
                className={styles.icon}
                onClick={() => setPasswordView(!PasswordView)}
              >
                <Icons name="AiFillEyeInvisible" />
              </div>
            )}
          </>
        )}
      </div>
      <InputBox1 name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
}

export default InputLabel1;
