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
import dots from "../../assets/dots.svg";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import styles from "./ColumnPage.module.scss";

const Column: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns.columns);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  const { boardId } = useParams();

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
    }
  }, [dispatch, boardId]);

  const handleAddList = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
    setShowContextMenu(false);
  };

  const handleContextMenuClick = (
    event: React.MouseEvent,
    columnId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedColumnId(columnId);
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
    setShowContextMenu(true);
  };

  const handleDocumentClick = () => {
    setShowContextMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.columnsContainer}>
      {columns.map((column) => (
        <div key={column._id} className={styles.column}>
          <div className={styles.columnHeader}>
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
            <img
              src={dots}
              alt="Dots"
              className={styles.dotsIcon}
              onClick={(e) => handleContextMenuClick(e, column._id)}
              onContextMenu={(e) => handleContextMenuClick(e, column._id)}
            />
          </div>
          {/* Iterate over cards in the column
          {column.cards.map((card) => (
            <Card key={card.id} {...card} />
          ))} */}
          {/* Add card functionality */}
        </div>
      ))}
      {showInput ? (
        <form onSubmit={handleAddList}>
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            autoFocus
            placeholder="Enter new list title"
          />
          <button type="submit">Add List</button>
        </form>
      ) : (
        <button
          className={styles.addListButton}
          onClick={() => setShowInput(true)}
        >
          + Add New List
        </button>
      )}

      {showContextMenu && selectedColumnId && (
        <ContextMenu
          onDelete={() => handleDeleteColumn(selectedColumnId)}
          position={contextMenuPosition}
        />
      )}
    </div>
  );
};

export default Column;
