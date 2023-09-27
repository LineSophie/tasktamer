import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ToDoModal from './components/ToDoModal/ToDoModal';
import Sidebar from './components/Sidebar/Sidebar';
import TaskCardList from './components/TaskCardList/TaskCardList';
import DeleteTaskConfirmation from './components/DeleteTaskConfirmation/DeleteTaskConfirmation';
import EditTask from './components/EditTask/EditTask';
import EditProjects from './components/EditProjects/EditProjects';
import EditTags from './components/EditTags/EditTags';

let idCounter = 0;

function generateUniqueId() {
  return idCounter++;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false)
  const [taskCounts, setTaskCounts] = useState({
    today: 0,
    all: 0,
    important: 0,
    overdue: 0,
    archive: 0,
  });

  const openModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const closeModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const addTask = (task) => {
    setTasks((prevTasks) => {
      const newTask = {
        id: generateUniqueId(),
        archive: false,
        ...task,
      };
      return [...prevTasks, newTask];
    });
  };
  
  const removeTask = (index) => {
    setDeleteTaskIndex(index);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmRemoveTask = () => {
    if (deleteTaskIndex !== null) {
      const updatedTasksCopy = [...tasks];
      updatedTasksCopy.splice(deleteTaskIndex, 1);
      setTasks(updatedTasksCopy);
      setDeleteTaskIndex(null);
      setIsDeleteConfirmationOpen(false);
    }
  };

  const cancelRemoveTask = () => {
    setDeleteTaskIndex(null);
    setIsDeleteConfirmationOpen(false);
  };

  const archiveTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, archive: true } : task
      )
    );
  };

  const openEditTaskModal = (index) => {
    setEditTaskIndex(index);
    setIsEditModalOpen(true);
  };

  const saveEditedTask = (editedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        index === editTaskIndex ? { ...editedTask } : task
      )
    );
    setIsEditModalOpen(false);
  };

  const openProjectModal = () => {
    setIsEditProjectModalOpen(true);
  };
  
  const closeProjectModal = () => {
    setIsEditProjectModalOpen(false);
  };

  const addProject = (directory) => {
    setProjects((prevDirectories) => [...prevDirectories, directory]);
  };
  
  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const addNewTag = (tagNew) => {
    setTags((prevTags) => [...prevTags, tagNew]);
  };

  const openTagModal = () => {
    setIsEditTagModalOpen(true);
  };

  const closeTagModal = () => {
    setIsEditTagModalOpen(false);
  };

  const handleRemoveTag = (index) => {
    const updatedTag = [...tags];
    updatedTag.splice(index, 1);
    setTags(updatedTag);
  };

  const filterTasks = useCallback(() => {
    if (activeTab === selectedProject) {
      return tasks.filter((task) => task.selectedProject === selectedProject && !task.archive);
    } 
    if (activeTab === selectedTag) {
      return tasks.filter((task) => task.label === selectedTag && !task.archive);
    } else {
      if (activeTab === 'today') {
        const today = new Date().toISOString().split('T')[0];
        return tasks.filter((task) => task.dueDate === today && !task.archive);
      } else if (activeTab === 'important') {
        return tasks.filter((task) => task.priorityLevel === 'High' && !task.archive);
      } else if (activeTab === 'archive') {
        return tasks.filter((task) => task.archive === true);
      } else if (activeTab === 'overdue') {
        const today = new Date().toISOString().split('T')[0];
        return tasks.filter((task) => task.dueDate < today && !task.archive);
      } else {
        return tasks.filter((task) => task && !task.archive);
      }
    }
  }, [activeTab, tasks, selectedProject, selectedTag]);

  useEffect(() => {
    const filteredTasks = filterTasks();
    setTaskCounts({
      today: filteredTasks.length,
      all: filteredTasks.filter((task) => !task.archive).length,
      important: filteredTasks.filter((task) => task.priorityLevel).length,
      archive: filteredTasks.filter((task) => task.archive).length,
      overdue: filteredTasks.length,
    });
  }, [tasks, activeTab, filterTasks]);

  return (
    <div className="todo-app">
      <div className='app-header'>
        <header><h1>🪅 TaskTamer 🪅</h1></header>
      </div>

      <div className='main'>
        <Sidebar
          onTabChange={(tab) => setActiveTab(tab)}
          openModal={openModal}
          addDirectory={addProject}
          addNewTag={addNewTag}
          directories={projects}
          setSelectedProject={setSelectedProject} 
          setSelectedTag={setSelectedTag} 
          openModalAdd={openModal}
          onOpenProjectModal={openProjectModal}
          onOpenTagModal={openTagModal}
          allTags={tags}
        />

        <div className='tab-page'>

          <TaskCardList
            filterTasks={filterTasks}
            onRemoveTask={removeTask}
            openEditModal={openEditTaskModal}
            onArchive={archiveTask}
            tasks={tasks}
            activeTab={activeTab}
            taskCounts={taskCounts}
          />

          {isAddTaskModalOpen && 
            <ToDoModal
              onClose={closeModal} 
              onSave={addTask} 
              directories={projects} 
              newTag={tags}
            />
          }

          {isEditProjectModalOpen && 
            <EditProjects
            onCloseEditProject={closeProjectModal}
            directories={projects}
            onAddProject={addProject}
            onRemoveProject={handleRemoveProject} 
            />
          }

          {isEditTagModalOpen && 
            <EditTags
            onCloseEditTag={closeTagModal}
            allTags={tags}
            onAddTag={addNewTag}
            onRemoveTag={handleRemoveTag} 
            />
          }
          
          {isDeleteConfirmationOpen && (
            <DeleteTaskConfirmation
              confirmRemoveTask={confirmRemoveTask}
              cancelRemoveTask={cancelRemoveTask}
            />
          )}
          
          {isEditModalOpen && editTaskIndex !== null && (
            <EditTask
              editTask={tasks[editTaskIndex]}
              onSaveEdit={saveEditedTask}
              onClose={() => setIsEditModalOpen(false)}
              directories={projects}
              tags={tags}
            />
          )}

          <button className='addTaskBtn' onClick={openModal}>+ Add Task</button>

        </div>
      </div>
    </div>
  );
}

export default App;