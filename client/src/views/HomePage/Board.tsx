import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBoards,
  updateBoardAsync,
  deleteBoardAsync,
  addNewBoard,
} from "../../redux/slices/boardSlice";
import { AppDispatch } from "../../redux/store/store";
import Card from "../../components/Card/Card";
import styles from "./Board.module.scss";
import { useNavigate } from "react-router-dom";

const Board: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.boards);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const backgroundColors: string[] = [
    "#0079bf", // blue
    "#d29034", // orange
    "#519839", // green
    "#b04632", // red
  ];

  const handleAddBoard = (): void => {
    const randomColorIndex: number = Math.floor(
      Math.random() * backgroundColors.length
    );
    const randomColor = backgroundColors[randomColorIndex];
    if (newBoardTitle.trim() === "") {
      return;
    }
    const newBoard = {
      title: newBoardTitle,
      backgroundColor: randomColor,
    };
    const userId = currentUser?._id || 'defaultUserId';
    dispatch(addNewBoard({ board: newBoard, userId }));
    setNewBoardTitle("");
  };
  

  const handleUpdateBoard = (boardId: string, updatedTitle: string) => {
    const updatedBoard = {
      _id: boardId,
      title: updatedTitle,
    };
    dispatch(updateBoardAsync({ boardId, updatedBoard }));
  };

  const handleDeleteBoard = (boardId: string) => {
    dispatch(deleteBoardAsync(boardId));
  };

  const navigate = useNavigate();

  const handleBoardClick = (boardId: string) => {
    navigate(`/app/list/${boardId}`);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Boards</h2>
        <div className={styles.boardList}>
          {boards.map((board) => (
            <div
              key={board._id}
              className={styles.boardCard}
              style={{ backgroundColor: board.backgroundColor }}
              onClick={() => handleBoardClick(board._id)}
            >
              <input
                type="text"
                value={board.title}
                className={styles.boardTitleInput}
                onChange={(e) => {
                  e.stopPropagation();
                  handleUpdateBoard(board._id, e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBoard(board._id);
                }}
              >
                Delete
              </button>
              {/* Render tasks and other components for each board */}
            </div>
          ))}
          <div className={styles.addBoardCard}>
            <input
              type="text"
              placeholder="Enter board title"
              className={styles.newBoardTitleInput}
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
            />
            <button className={styles.addButton} onClick={handleAddBoard}>
              Add Board
            </button>
          </div>
        </div>
      </div>
      {/* Repeat for other sections... */}
    </div>
  );
};

export default Board;
