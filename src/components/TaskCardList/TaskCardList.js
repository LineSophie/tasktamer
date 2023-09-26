import React, { useState, useMemo } from "react";
import TaskCard from '../TaskCard/TaskCard';
import styles from './TaskCardList.module.css';

function TaskCardList({
  filterTasks,
  onRemoveTask,
  openEditModal,
  onArchive,
  tasks,
  activeTab,
  taskCounts,
}) {

  const day = new Date().toISOString().split('T')[0];
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedTasks = useMemo(() => {
    const tasksToSort = filterTasks();
    return tasksToSort.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filterTasks, sortOrder]);

  const sortTasksByDate = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <ul className="task-list">
      <div className='header-to-do'>
        <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        <div className='headerDiv'>
          <div className='headerTaskCount'>
            {taskCounts[activeTab]}
          </div>

          {/* Date Display */}
          {activeTab === 'today' && (
            <div className='dateDiv'>{day}</div>
          )}

          {/* Sort button */}
          {activeTab !== 'today' && (
            <div>
              <button onClick={sortTasksByDate} className={styles.sortButton}>
                Sort by Date {sortOrder === 'asc' ? '⬆' : '⬇'}
              </button>
            </div>
          )}
        </div>
      </div>

      {sortedTasks.map((taskinfo) => (
        <TaskCard 
          key={taskinfo.id}
          taskinfo={taskinfo}
          onRemoveTask={onRemoveTask}
          tasks={tasks}
          openEditModal={() => openEditModal(taskinfo.id)}
          onArchive={() => onArchive(taskinfo.id)}
        />
      ))}
    </ul>
  );
}

export default TaskCardList;