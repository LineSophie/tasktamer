import React, { useEffect, useState } from "react";
import styles from '../EditProjects/EditProjects.module.css';


function EditTags({ onCloseEditTag, allTags, onAddTag, onRemoveTag }) {
 const [tagList, setTagList] = useState(allTags);
 const [newTag, setNewTag] = useState({ name: ''});

    useEffect(() => {
      setTagList(allTags);
    }, [allTags]);

  const handleAddTag = () => {
    const updatedTag = [...tagList, newTag];
    onAddTag(newTag);
    setTagList(updatedTag);
    setNewTag({ name: '' }); 
  };

  const handleTagChange = (index, newText) => {
    const updatedTag = [...tagList];
    updatedTag[index].name = newText;
    setTagList(updatedTag);
  };

  const handleRemoveTag = (index) => {
    onRemoveTag(index);
  };
  
  const handleSaveTag = () => {
    onCloseEditTag();
  };

  const handleCloseModal = () => {
    onCloseEditTag();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modalContent">

          <div className={styles.headerEditProject}>
           <h3>🛠️ Edit Tags 🛠️</h3>
          </div>

          {tagList.map((projectListItem, index) => (
            <div className={styles.editProjectsDiv} key={index}>
              <input
                id={`editTags${index}`}
                placeholder="New Tag"
                value={projectListItem.name}
                onChange={(e) => handleTagChange(index, e.target.value)}
              />
              <button className={styles.removeProjectBtn} onClick={handleRemoveTag}>x</button>
            </div>
          ))}
          <button className={styles.addBtn} onClick={handleAddTag}>+ Add Tag </button>

   
          <div className={styles.SaveCloseDiv}>
            <button className={styles.SaveCloseBtn} onClick={handleSaveTag}>Save</button>
            <button className={styles.SaveCloseBtn} onClick={handleCloseModal}>Close</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditTags;