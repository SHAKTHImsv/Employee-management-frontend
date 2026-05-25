import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';
import TaskStats from '../components/TaskStats';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [sortBy, setSortBy] = useState('createdAt');
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Extract custom unified loading attribute from context
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Route protection barrier logic
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Data fetching hook
  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    }
  }, [filters, sortBy, user]);

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const response = await taskAPI.getTasks({ ...filters, sortBy });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskAPI.getTaskStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const handleAddTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      fetchTasks();
      fetchStats();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      await taskAPI.updateTask(taskId, taskData);
      fetchTasks();
      fetchStats();
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Guard execution paths if authentication initialization is rendering
  if (authLoading) {
    return <div className="loading">Gathering your universe...</div>;
  }

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Task Hub</h1>
          <p className="user-info">Let's crush it today, {user.name}!</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </header>

      <main className="dashboard-main">
        {stats && <TaskStats stats={stats} />}

        <div className="dashboard-content">
          <aside className="left-panel">
            <div className="form-section">
              <button
                className={`btn-primary ${showForm ? 'cancel-mode' : ''}`}
                onClick={() => setShowForm(!showForm)}
                style={{ marginBottom: showForm ? '1.5rem' : '0' }}
              >
                {showForm ? '💥 Close Action Panel' : '✨ Create New Task'}
              </button>
              {showForm && (
                <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
              )}
            </div>
          </aside>

          <section className="right-panel">
            <div className="right-panel-controls">
              <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

              <div className="sort-section">
                <label htmlFor="sort">Sort</label>
                <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="createdAt">📅 Newest</option>
                  <option value="dueDate">⏰ Limit Date</option>
                  <option value="priority">🔥 Importance</option>
                </select>
              </div>
            </div>

            {loadingTasks ? (
              <div className="loading">Updating task stacks...</div>
            ) : (
              <TaskList
                tasks={tasks}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                editingTask={editingTask}
                onEditStart={setEditingTask}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;