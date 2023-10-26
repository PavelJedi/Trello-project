import React from 'react';
import styles from './Navbar.module.scss';
import { FaPlus, FaExclamation, FaBell, FaUser } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>Trello</div>
        <div className={styles.dash}> - </div>
        <div className={styles.boards}>Boards</div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.icon}><FaPlus /></div>
        <div className={styles.icon}><FaExclamation /></div>
        <div className={styles.icon}><FaBell /></div>
        <div className={styles.userPhoto}>
            <FaUser />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
