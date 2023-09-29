import React from "react";

// Styles
import styles from "./Loader.module.scss";

const Loader = ({ isAuthPage }) => {
  return (
    <div
      className={`${styles.loader} ${
        isAuthPage ? styles.white : styles.purple
      }`}
    />
  );
};

export default Loader;
