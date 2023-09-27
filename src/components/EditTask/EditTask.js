import React, { useState } from 'react';
import styles from './EditTask.module.css';

function EditTask({ editTask, onSaveEdit, onClose, directories, tags }) {
  const [editedTask, setEditedTask] = useState(editTask);
  const handleSubtaskChange = (index, newText) => {
    const updatedSubtasks = [...editedTask.subtasks];
    updatedSubtasks[index].text = newText;
    setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...editedTask.subtasks];
    updatedSubtasks.splice(index, 1);
    setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
  };

  const handleAddSubtask = () => {
    const updatedSubtasks = [...editedTask.subtasks, { text: '', completed: false }];
    setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
  };  

  const handleSaveEdit = () => {
    onSaveEdit(editedTask);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.editTaskHeader}>⭐️ Edit Task ⭐️</h2>

          <div className={styles.inputContainer}>
            <label htmlFor='editTaskTitle'>Task Title</label><br/>
            <input
              type="text"
              id='editTaskTitle'
              placeholder="Edit Task Title"
              value={editedTask.taskTitle}
              onChange={(e) =>
                setEditedTask({ ...editedTask, taskTitle: e.target.value })
              }
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='editTaskDescription'>Edit Task Description</label><br/>
            <textarea 
              rows={3} 
              cols={50}
              id='editTaskDescription'
              placeholder="Description"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='editDueDate'>Due Date</label><br/>
            <input
              id='editDueDate'
              type="date"
              value={editedTask.dueDate}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='editPriorityLevel'>Priority</label><br/>
            <select
              id='editPriorityLevel'
              value={editedTask.priorityLevel}
              onChange={(e) =>
                setEditedTask({ ...editedTask, priorityLevel: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='editProject'>Project</label><br/>
            <select
              id='editProject'
              value={editedTask.selectedProject}
              onChange={(e) =>
                setEditedTask({ ...editedTask, selectedProject: e.target.value })
              }
            >
              <option>None</option>
              {directories.map((dir) => (
                <option key={dir.name} value={dir.name}>
                  {dir.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='editTag'>Tag</label><br/>
            <select
              id='editTag'
              value={editedTask.label}
              onChange={(e) =>
                setEditedTask({ ...editedTask, label: e.target.value })
              }
            >
              <option>No Tag</option>
              {tags.map((tag) => (
                <option key={tag.name} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='editSubtask'>SubTasks</label>
                <button  
                  id='editSubtask' 
                  className={styles.addSubtaskBtn} 
                  onClick={handleAddSubtask}>Add +
                </button><br/>
              {editedTask.subtasks.map((subtask, index) => (
                <div key={index} className={styles.subTaskDiv} >
                  <input
                    type="text"
                    id={`editSubtask${index}`}
                    placeholder="Subtask"
                    value={subtask.text}
                    onChange={(e) =>
                      handleSubtaskChange(index, e.target.value)
                    }
                  />
                  <button className={styles.removeBtn} onClick={() => handleRemoveSubtask(index)}>
                    X
                  </button>
                </div>
              ))}
          </div>

          <hr /><br />
          <div className={styles.closeSaveDiv}> 
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;