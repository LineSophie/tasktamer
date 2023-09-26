import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import SidebarSubcategory from '../SidebarSubcategory/SidebarSubcategory';

function Sidebar({
  allTags,
  directories,
  onTabChange,
  addDirectory,
  setSelectedProject,
  addNewTag,
  setSelectedTag,
  openModalAdd,
  onOpenProjectModal,
  onOpenTagModal,
}) {
  const [activeTab, setActiveTab] = useState('today');
  const [subcategories, setSubcategories] = useState({
    projects: {
      list: directories,
      newSubcategory: { name: '' },
      isOpen: true,
      isAddModalOpen: false,
    },
    tags: {
      list: allTags,
      newSubcategory: { name: '' },
      isOpen: true,
      isAddModalOpen: false,
    },
  });

  useEffect(() => {
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      projects: { ...prevSubcategories.projects, list: directories },
      tags: { ...prevSubcategories.tags, list: allTags },
    }));
  }, [directories, allTags]);

  const toggleSubcategories = (category) => {
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [category]: { ...prevSubcategories[category], isOpen: !prevSubcategories[category].isOpen },
    }));
  };

  const openAddSubcategoryModal = (category) => {
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [category]: { ...prevSubcategories[category], isAddModalOpen: true },
    }));
  };

  const closeAddSubcategoryModal = (category) => {
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [category]: { ...prevSubcategories[category], isAddModalOpen: false },
    }));
  };

  const addSubcategory = (category) => {
    const { newSubcategory, list } = subcategories[category];
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [category]: { ...prevSubcategories[category], list: [...list, newSubcategory] },
    }));
    if (category === 'projects') {
      addDirectory(newSubcategory);
    } else if (category === 'tags') {
      addNewTag(newSubcategory);
    }
    setSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [category]: { ...prevSubcategories[category], newSubcategory: { name: '' } },
    }));
    closeAddSubcategoryModal(category);
  };

  const openCategoryModal = (category) => {
    if (category === 'projects') {
      onOpenProjectModal();
    } else if (category === 'tags') {
      onOpenTagModal();
    }
  };

  const selectCategory = (category, categoryName) => {
    onTabChange(categoryName);
    setActiveTab(categoryName);
    if (category === 'projects') {
      setSelectedProject(categoryName);
    } else if (category === 'tags') {
      setSelectedTag(categoryName);
    }
  };

  const renderSubcategories = (category) => {
    const { isOpen, list, isAddModalOpen, newSubcategory } = subcategories[category];

    return (
      <div className={styles.subcategoryContainer}>
        <h3>
          <button
            onClick={() => toggleSubcategories(category)}
            className={styles.subCategoryDropdown}
          >
            {isOpen ? `${category.charAt(0).toUpperCase() + category.slice(1)} ▼`  : `${category.charAt(0).toUpperCase() + category.slice(1)} ▲`}
          </button>
        </h3>

        {isAddModalOpen && (
          <SidebarSubcategory
            newSubcategory={newSubcategory}
            setNewSubcategory={(newSubcategory) =>
              setSubcategories((prevSubcategories) => ({
                ...prevSubcategories,
                [category]: { ...prevSubcategories[category], newSubcategory },
              }))
            }
            addSubcategory={() => addSubcategory(category)}
            closeAddSubcategoryModal={() => closeAddSubcategoryModal(category)}
            placeHolder={`Your ${category.charAt(0).toUpperCase() + category.slice(1)} Name`}
            headerTitle={`Add ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          />
        )}

        {isOpen && (
          <li className={styles.subcategoryDropdown}>
            <ul>
              {list.map((subcategory) => (
                <li
                  key={subcategory.name}
                  onClick={() => selectCategory(category, subcategory.name)}
                  className={activeTab === subcategory.name ? styles.activeTab : ''}
                >
                  {subcategory.name}
                </li>
              ))}

              <button
                onClick={() => openAddSubcategoryModal(category)}
                className={styles.addDirectory}
              >
                + Add {category.charAt(0).toUpperCase() + category.slice(1)} /
              </button>

              <button
                onClick={() => openCategoryModal(category)}
                className={styles.addDirectory}
              >
                Edit {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </ul>
          </li>
        )}
      </div>
    );
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.main}>
        <h3> </h3>
        <ul>
          <li
            onClick={() => selectCategory('today', 'today')}
            className={activeTab === 'today' ? styles.activeTab : ''}
          >
            🗓️ Today
          </li>
          <li
            onClick={() => selectCategory('all', 'all')}
            className={activeTab === 'all' ? styles.activeTab : ''}
          >
            📚 All
          </li>
          <li
            onClick={() => selectCategory('overdue', 'overdue')}
            className={activeTab === 'overdue' ? styles.activeTab : ''}
          >
            ⏰ Overdue
          </li>
          <li
            onClick={() => selectCategory('important', 'important')}
            className={activeTab === 'important' ? styles.activeTab : ''}
          >
            🚨 Important
          </li>
          <li
            onClick={() => selectCategory('archive', 'archive')}
            className={activeTab === 'archive' ? styles.activeTab : ''}
          >
            🏛️ Archived
          </li>
        </ul>
      </div>

      <div className={styles.dynamicContent}>
        {renderSubcategories('projects')}
        {renderSubcategories('tags')}
      </div>
      <br></br>
      <hr></hr>
      <button className={styles.addBtn} onClick={openModalAdd}>
        + Add Task
      </button>
    </div>
  );
}

export default Sidebar;