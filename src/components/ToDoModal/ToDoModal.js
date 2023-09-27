import React, { useState } from 'react';
import styles from './ToDoModal.module.css';

function ToDoModal({ onClose, onSave, directories, newTag }) {

  const initialFormData = {
    taskTitle: '',
    dueDate: new Date().toISOString().split('T')[0],
    description: '',
    subtask: '',
    subtasks: [],
    label: 'No Tag',
    priorityLevel: 'Medium',
    selectedProject: 'None',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubtaskKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSubtask();
    }
  };

  const addSubtask = () => {
    const { subtask, subtasks } = formData;
    if (subtask.trim() === '') return;
    setFormData({
      ...formData,
      subtasks: [...subtasks, { text: subtask }],
      subtask: '',
    });
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks.splice(index, 1);
    setFormData({
      ...formData,
      subtasks: updatedSubtasks,
    });
  };

  const handleSave = () => {
    if (formData.taskTitle.trim() === '') return;

    const mappedSubtasks = formData.subtasks.map((subtask) => ({
      text: subtask.text,
      completed: false,
    }));

    onSave({
      ...formData,
      subtasks: mappedSubtasks,
    });
    setFormData(initialFormData);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.addTaskHeader}>⭐️ Add a New Task ⭐️</h2>

          <div className={styles.inputContainer}>
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              placeholder="Add Task Title"
              value={formData.taskTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="description">Description</label>
            <textarea 
              rows={4} 
              cols={47}
              id="description"
              name="description"
              placeholder="Add Task Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="tags">Tag</label>
            <select
              id="tags"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
            >
              <option value={''}>None</option>
              {newTag.map((newTags) => (
                <option key={newTags.name} value={newTags.name}>
                  {newTags.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="priorityLevel">Priority</label>
            <select
              id="priorityLevel"
              name="priorityLevel"
              value={formData.priorityLevel}
              onChange={handleInputChange}
            >
              <option value="Low">Low 🥉</option>
              <option value="Medium">Medium 🥈</option>
              <option value="High">High 🥇</option>
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="directory">Project</label>
            <select
              id="directory"
              name="selectedProject"
              value={formData.selectedProject}
              onChange={handleInputChange}
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
            <label htmlFor="subtask">Subtasks</label>
            <input
              type="text"
              id="subtask"
              name="subtask"
              placeholder="Add subtask"
              value={formData.subtask}
              onChange={handleInputChange}
              onKeyPress={handleSubtaskKeyPress}
            />
            <ul>
              {formData.subtasks.map((subtask, index) => (
                <li key={index}>
                  <button
                    className={styles.removeSubtask}
                    onClick={() => removeSubtask(index)}
                  >
                    X
                  </button>
                  {subtask.text}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ToDoModal;