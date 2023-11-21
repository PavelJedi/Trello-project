import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";

//styles
import styles from "./Navbar.module.scss";
import trelloIcon from "../../../assets/trello.svg";
import plusIcon from "../../../assets/plus.svg";
import alertIcon from "../../../assets/alert.svg";
import bellIcon from "../../../assets/bell.svg";
import userIcon from "../../../assets/user.svg";
import markIcon from "../../../assets/mark.svg";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("logout");
  };

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
            <div className={styles.logout}>
              <Link onClick={handleLogout} to={""}>
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
