import React from "react";
import styles from "./Board.module.scss";

const Board: React.FC = () => {
  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h2>Board Title</h2>
      </div>
      <div className={styles.lists}>
        <div className={styles.listContainer}>
          <div className={styles.list}>
            <h3>List 1</h3>
            <div className={styles.taskCard}>Task 1</div>
            <div className={styles.taskCard}>Task 2</div>
            <button className={styles.addCardButton}>Add Card</button>
          </div>
          <div className={styles.list}>
            <h3>List 2</h3>
            <div className={styles.taskCard}>Task 3</div>
            <div className={styles.taskCard}>Task 4</div>
            <button className={styles.addCardButton}>Add Card</button>
          </div>
          <div className={styles.addListPlaceholder}>
            <button className={styles.addListButton}>Add List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
