import React from "react";
import styles from './SidebarSubcategory.module.css';

function SidebarSubcategory ({
    newSubcategory, 
    setNewSubcategory, 
    addSubcategory, 
    closeAddSubcategoryModal, 
    placeHolder, 
    headerTitle}) {

    return(
    <div className={styles.subcategoryModalOverlay}>
        <div className={styles.subcategoryModal}>
            <div className={styles.modalContent}>

                <h3>{headerTitle}</h3> 

                <input
                type="text"
                id='SubcategoryName'
                placeholder={placeHolder}
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                />

                <button onClick={addSubcategory}>Save</button>
                <button onClick={closeAddSubcategoryModal}>Cancel</button>

            </div>
        </div>
    </div>

    );
}

export default SidebarSubcategory;