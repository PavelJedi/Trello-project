import React from "react";
import { ErrorMessageProps } from "../../../interfaces/interfaces";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./ErrorMessage.module.scss";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <FaExclamationTriangle />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
