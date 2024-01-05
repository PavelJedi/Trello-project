import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns, addNewColumn } from "../../redux/slices/columnSlice";
import { AppDispatch } from "../../redux/store/store";
import { useParams } from "react-router-dom";

//service
import { getColumns } from "../../services/columnService";

//components
import Card from "../../components/Card/Card";

//styles
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

  return (
    <div className={styles.columnsContainer}>
      {/* Iterate over columns */}
      {columns.map((column) => (
        <div key={column._id} className={styles.column}>
          <h2 className={styles.columnTitle}>{column.title}</h2>
          {/* Iterate over cards in the column
          {column.cards.map((card) => (
            <Card key={card.id} {...card} />
          ))} */}
          {/* Add card functionality */}
        </div>
      ))}
      {showInput && (
        <div>
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="Enter new list title"
          />
          <button onClick={handleAddList}>Add List</button>
        </div>
      )}
      {/* Button to toggle input display */}
      {!showInput && (
        <button onClick={() => setShowInput(true)}>Add New List</button>
      )}
    </div>
  );
};

export default Column;
