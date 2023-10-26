import React from "react";

// Styles
import styles from "./Loader.module.scss";

interface LoaderProps {
  isAuthPage: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isAuthPage }) => {
  return (
    <div
      className={`${styles.loader} ${
        isAuthPage ? styles.white : styles.purple
      }`}
    />
  );
};

export default Loader;
