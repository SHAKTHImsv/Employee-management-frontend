import React from 'react';
import '../styles/TaskFilters.css';

const TaskFilters = ({ filters, onFilterChange }) => {
  const handleStatusChange = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handlePriorityChange = (priority) => {
    onFilterChange({ ...filters, priority });
  };

  const handleSearchChange = (search) => {
    onFilterChange({ ...filters, search });
  };

  const handleClearFilters = () => {
    onFilterChange({ status: '', priority: '', search: '' });
  };

  return (
    <div className="task-filters">
      <div className="filter-group">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={filters.priority}
          onChange={(e) => handlePriorityChange(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button className="btn-clear-filters" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default TaskFilters;
