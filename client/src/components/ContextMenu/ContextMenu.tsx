
import React from "react";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {
  onDelete: () => void;
  position: { top: number; left: number };
}

const ContextMenu: React.FC<ContextMenuProps> = ({ onDelete, position }) => {
  return (
    <div className={styles.contextMenu} style={{ top: position.top, left: position.left }}>
      <div className={styles.menuItem} onClick={onDelete}>
        Delete List
      </div>
    </div>
  );
};

export default ContextMenu;
