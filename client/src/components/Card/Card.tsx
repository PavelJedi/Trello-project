import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { addNewTask } from '../../redux/slices/taskSlice';
import styles from './Card.module.scss';

interface CardProps {
  columnId: string;
}

const Card: React.FC<CardProps> = ({ columnId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    const formData = new FormData();
    formData.append('title', taskTitle);
    dispatch(addNewTask({ columnId, taskData: formData }));
    setTaskTitle('');
    setIsAdding(false);
  };

  return (
    <div className={styles.cardModal}>
      {isAdding ? (
        <>
          <input
            autoFocus
            className={styles.taskInput}
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter a title for this card..."
            onBlur={() => setIsAdding(false)}
          />
          <button className={styles.confirmAddButton} onClick={handleAddTask}>
            Add card
          </button>
          <button className={styles.cancelAddButton} onClick={() => setIsAdding(false)}>
            X
          </button>
        </>
      ) : (
        <button className={styles.addButton} onClick={() => setIsAdding(true)}>
          + Add a card
        </button>
      )}
    </div>
  );
};

export default Card;
