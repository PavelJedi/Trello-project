import React from "react";
import { InputFieldProps } from "../../../interfaces/interfaces";
import styles from "./InputField.module.scss";

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  placeholder,
  icon,
  onChange,
  maxLength,
}) => {
  return (
    <div className={styles.inputField}>
      <input
        className={styles.input}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        required
        maxLength={maxLength}
      />
      <span className={styles.icon}>{icon}</span>
    </div>
  );
};

export default InputField;
