import React from "react";
import { useNavigate } from "react-router-dom";

// Assets
import notFound from "../../../assets/notFound.svg";

// Styles
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/app");
  }

  return (
    <div className={styles.wrapper}>
      <img src={notFound} alt="404 not found" />
      <div className={styles.block}>
        <h1>
          <i>
            We&apos;re sorry, the page you requested could not be found. Please
            go back to the home page.
          </i>
        </h1>
        <button className={styles.button} onClick={handleClick}>
          Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
