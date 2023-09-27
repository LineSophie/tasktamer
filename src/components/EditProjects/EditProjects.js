import React, { useEffect, useState } from "react";
import styles from './EditProjects.module.css';

function EditProjects({ onCloseEditProject, directories, onAddProject, onRemoveProject }) {
  const [projectList, setProjectList] = useState(directories);
  const [newProject, setNewProject] = useState({ name: '' });

  useEffect(() => {
    setProjectList(directories);
  }, [directories]);

  const handleAddProject = () => {
    const updatedProjects = [...projectList, newProject];
    onAddProject(newProject);
    setProjectList(updatedProjects);
    setNewProject({ name: '' });
  };

  const handleProjectChange = (index, newText) => {
    const updatedProjects = [...projectList];
    updatedProjects[index].name = newText;
    setProjectList(updatedProjects);
  };

  const handleRemoveProject = (index) => {
    onRemoveProject(index);
  };

  const handleSaveProjects = () => {
    onCloseEditProject();
  };

  const handleCloseModal = () => {
    onCloseEditProject();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modalContent">
          <div className={styles.headerEditProject}>
            <h3>🛠️ Edit Projects 🛠️</h3>
          </div>
          {projectList.map((projectListItem, index) => (
            <div className={styles.editProjectsDiv} key={index}>
              <input
                id={`editProjects${index}`}
                placeholder="New Project"
                value={projectListItem.name}
                onChange={(e) => handleProjectChange(index, e.target.value)}
              />
              <button className={styles.removeProjectBtn} onClick={() => handleRemoveProject(index)}>x</button>
            </div>
          ))}
          <button className={styles.addBtn} onClick={handleAddProject}>+ Add Project </button>
          <div className={styles.SaveCloseDiv}>
            <button className={styles.SaveCloseBtn} onClick={handleSaveProjects}>Save</button>
            <button className={styles.SaveCloseBtn} onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProjects;