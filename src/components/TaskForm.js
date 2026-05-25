import React, { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      tags: '',
    }
  );
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    const submitData = {
      ...formData,
      tags: formData.tags
        ? formData.tags.split(',').map((tag) => tag.trim())
        : [],
    };

    onSubmit(submitData);
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        tags: '',
      });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          maxLength="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          maxLength="500"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g., work, important, bug"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
