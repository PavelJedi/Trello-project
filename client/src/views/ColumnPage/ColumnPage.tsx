import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColumns,
  addNewColumn,
  updateColumnAsync,
  deleteColumnAsync,
} from "../../redux/slices/columnSlice";
import { AppDispatch } from "../../redux/store/store";
import { useParams } from "react-router-dom";
import styles from "./ColumnPage.module.scss";

const Column: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns.columns);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { boardId } = useParams();

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
    }
  }, [dispatch, boardId]);

  const handleAddList = (): void => {
    if (newColumnTitle.trim() === "" || !boardId) {
      return;
    }
    const newColumn = {
      column: {
        title: newColumnTitle,
        boardId,
      },
    };
    dispatch(addNewColumn(newColumn)).then(() => {
      setNewColumnTitle("");
      setShowInput(false);
    });
  };

  const handleUpdateColumn = (columnId: string, updatedTitle: string) => {
    const updatedColumn = {
      _id: columnId,
      title: updatedTitle,
    };
    dispatch(updateColumnAsync({ columnId, updatedColumn }));
  };

  const handleDeleteColumn = (columnId: string) => {
    dispatch(deleteColumnAsync(columnId));
  };

  return (
    <div className={styles.columnsContainer}>
      {columns.map((column) => (
        <div key={column._id} className={styles.column}>
          <input
            type="text"
            value={column.title}
            className={styles.columnTitle}
            onChange={(e) => {
              e.stopPropagation();
              handleUpdateColumn(column._id, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {/* Iterate over cards in the column
          {column.cards.map((card) => (
            <Card key={card.id} {...card} />
          ))} */}
          {/* Add card functionality */}
        </div>
      ))}
      {showInput ? (
        <div>
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            onBlur={() => setShowInput(false)}
            autoFocus
            placeholder="Enter new list title"
          />
          <button onClick={handleAddList}>Add List</button>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)}>Add New List</button>
      )}
    </div>
  );
};

export default Column;
