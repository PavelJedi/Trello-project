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
import styles from "./Board.module.scss";
import dots from "../../assets/dots.svg";

const Board: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.boards);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const boardTitle = boards.length > 0 ? boards[0].title : "No boards found";

  const handleAddBoard = () => {
    if (newBoardTitle.trim() === "") {
      return;
    }
    const newBoard = {
      title: newBoardTitle,
    };
    dispatch(addNewBoard(newBoard));
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

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h2>{boardTitle}</h2>
      </div>
      <div className={styles.lists}>
        {boards.map((board) => {
          return (
            <div key={board._id} className={styles.listContainer}>
              <div className={styles.list}>
                <div className={styles.name}>
                  <input
                    type="text"
                    value={board.title}
                    onChange={(e) =>
                      handleUpdateBoard(board._id, e.target.value)
                    }
                  />
                  <div className={styles.dotsIconContainer}>
                    <img src={dots} alt="dots-icon" />
                  </div>
                  <button
                    onClick={() => {
                      handleDeleteBoard(board._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
                {/* Render tasks and other components for each board */}
              </div>
            </div>
          );
        })}
        <div className={styles.addListPlaceholder}>
          <input
            type="text"
            placeholder="Enter board title"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <button onClick={handleAddBoard}>Add Board</button>
        </div>
      </div>
    </div>
  );
};

export default Board;
