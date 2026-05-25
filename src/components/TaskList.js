import React, { useState } from 'react';
import TaskForm from './TaskForm';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onUpdate, onDelete, editingTask, onEditStart }) => {
  const [editingId, setEditingId] = useState(editingTask?._id);

  const handleEditSubmit = (taskData) => {
    onUpdate(editingId, taskData);
    setEditingId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDate2 = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !tasks.find(t => t._id === editingId)?.isCompleted;
  };

  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found. Create one to get started!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-card status-${task.status}`}>
          {editingId === task._id ? (
            <TaskForm
              initialData={{
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: formatDate2(task.dueDate),
                tags: task.tags.join(', '),
              }}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`priority-badge priority-${task.priority}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>

              {task.description && <p className="task-description">{task.description}</p>}

              <div className="task-meta">
                <span className={`status-badge status-${task.status}`}>
                  {task.status.replace('-', ' ')}
                </span>
                <span
                  className={`due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}
                >
                  📅 {formatDate(task.dueDate)}
                </span>
              </div>

              {task.tags.length > 0 && (
                <div className="task-tags">
                  {task.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="task-actions">
                <button
                  className="btn-edit"
                  onClick={() => setEditingId(task._id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
