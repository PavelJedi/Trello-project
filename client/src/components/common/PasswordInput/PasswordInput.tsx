import React from "react";
import { PasswordInputProps } from "../../../interfaces/interfaces";
import InputField from "../InputField/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./PasswordInput.module.scss";

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  showPassword,
  setShowPassword,
  onChange,
}) => {
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={styles.passwordInput}>
      <InputField
        type={showPassword ? "text" : "password"}
        name="password"
        value={value}
        placeholder="Password"
        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
        onChange={onChange}
        maxLength={10}
      />
      <button
        className={styles.toggle}
        type="button"
        onClick={toggleShowPassword}
      >
        {" "}
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
};

export default PasswordInput;
