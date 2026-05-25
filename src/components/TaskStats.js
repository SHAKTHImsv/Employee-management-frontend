import React from 'react';
import '../styles/TaskStats.css';

const TaskStats = ({ stats }) => {
  return (
    <div className="task-stats">
      <div className="stat-card total">
        <div className="stat-number">{stats.total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card completed">
        <div className="stat-number">{stats.completed}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card in-progress">
        <div className="stat-number">{stats.inProgress}</div>
        <div className="stat-label">In Progress</div>
      </div>
      <div className="stat-card todo">
        <div className="stat-number">{stats.todo}</div>
        <div className="stat-label">To Do</div>
      </div>
      <div className="stat-card high-priority">
        <div className="stat-number">{stats.highPriority}</div>
        <div className="stat-label">High Priority</div>
      </div>
    </div>
  );
};

export default TaskStats;
