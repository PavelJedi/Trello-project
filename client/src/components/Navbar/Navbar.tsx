import React from "react";
import { Link, Outlet } from "react-router-dom";

//styles
import styles from "./Navbar.module.scss";
import trelloIcon from "../../assets/trello.svg";
import plusIcon from "../../assets/plus.svg";
import alertIcon from "../../assets/alert.svg";
import bellIcon from "../../assets/bell.svg";
import userIcon from "../../assets/user.svg";
import markIcon from "../../assets/mark.svg";

const Navbar: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.leftSection}>
            <div className={styles.iconContainer}>
              <img src={trelloIcon} alt="trello-icon" />
            </div>
            <div className={styles.inactiveIconContainer}>
              <img src={markIcon} alt="plus-icon" />
            </div>
            <div className={styles.linkContainer}>
              <Link to="/" className={styles.linkText}>
                Boards
              </Link>
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.grayIconContainer}>
              <img src={plusIcon} alt="plus-icon" />
            </div>
            <div className={styles.grayIconContainer}>
              <img src={alertIcon} alt="plus-icon" />
            </div>
            <div className={styles.grayIconContainer}>
              <img src={bellIcon} alt="plus-icon" />
            </div>
            <div className={styles.userIconContainer}>
              <img src={userIcon} alt="user-icon" />
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
