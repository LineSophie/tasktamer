import React, { useState, useCallback, useEffect } from "react";
import styles from './TaskCard.module.css';

function TaskCard({ taskinfo, onRemoveTask, openEditModal, onArchive }) {
  const [subtasks, setSubtasks] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); 

  useEffect(() => {
    setSubtasks(taskinfo.subtasks);
  }, [taskinfo.subtasks]);

  const removeTask = useCallback(() => {
    onRemoveTask(taskinfo);
  }, [onRemoveTask, taskinfo]);

  const archiveTasks = useCallback(() => {
    onArchive(taskinfo);
  }, [onArchive, taskinfo]);

  const toggleSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);
  };

  const calculatePercentage = () => {
    if (subtasks.length === 0) {
      return 0;
    }

    const completedSubtasks = subtasks.filter((subtask) => subtask.completed);
    const percentage = (completedSubtasks.length / subtasks.length) * 100;
    return Math.round(percentage);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.taskCardContainer}>

      <div className={styles.taskHeader} onClick={toggleCollapse}>
        {taskinfo.taskTitle}  

        {subtasks.length > 0 && (
          <div className={styles.percentDone}>{calculatePercentage()}%</div>
        )}

        <div className={styles.taskContent} style={{fontSize:'0.5em', fontWeight:'normal'}}>
          {taskinfo.dueDate}
        </div>
      </div>

      {!isCollapsed && (
        <>
          {taskinfo.description.length > 0 && (
            <div className={styles.taskContent}>
              {taskinfo.description} 
            </div>
          )}

          <div className={styles.subTaskContent}>
            <ul>
              {subtasks.map((subtask, index) => (
                <li key={index}>
                  <input
                    id={`Subtask${index}${subtask.text}`}
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtask(index)}
                  />
                  {subtask.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.tagStyles}>
            {taskinfo.label !== 'No Tag' && (
            <div className={`${styles.labelTag} ${styles.labelcolor1}`}>
            {taskinfo.label}
              </div>
            )}

            <div className={`${styles.labelTag} ${styles.labelcolor3}`}>
              {taskinfo.selectedProject} 
            </div>

            {taskinfo.priorityLevel === 'High' && (
            <div className={`${styles.labelTag} ${styles.labelcolor2}`}>
              🚨 Urgent
            </div>
              )}

          </div>

          <div className={styles.taskBtnContainer}>
            <button className={styles.completeBtn} onClick={archiveTasks}>
              <i className="fas fa-check-circle"></i>
            </button>
            <button className={styles.removeBtn} onClick={removeTask}>
              <i className="fas fa-trash-can"></i>
            </button>
            <button className={styles.editBtn} onClick={openEditModal}>
              <i className="fas fa-ellipsis-vertical"></i>
            </button>
          </div>
        </>
      )}
      
    </div>
  );
}

export default TaskCard;