import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';
import TaskStats from '../components/TaskStats';
import '../styles/Dashboard.css';

// Local Mock Task Dataset
const INITIAL_DUMMY_TASKS = [
  {
    _id: 'task-1',
    title: '🚀 Launch Marketing Campaign',
    description: 'Prepare and deploy the Q2 email sequence and social media assets across platforms.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-06-01',
    createdAt: '2026-05-20'
  },
  {
    _id: 'task-2',
    title: '🔒 Secure Authentication Flow',
    description: 'Audit the session persistence and local storage handling to fix the page refresh bug.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-05-25',
    createdAt: '2026-05-18'
  },
  {
    _id: 'task-3',
    title: '🎨 Polish Dashboard UI Aesthetics',
    description: 'Implement vibrant CSS variables, glassmorphism cards, and spring animations.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-05-28',
    createdAt: '2026-05-24'
  },
  {
    _id: 'task-4',
    title: '📝 Write Core API Documentation',
    description: 'Document all available CRUD endpoints, filter params, and status code variations.',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-06-15',
    createdAt: '2026-05-25'
  }
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(INITIAL_DUMMY_TASKS);
  const [displayedTasks, setDisplayedTasks] = useState(INITIAL_DUMMY_TASKS);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [sortBy, setSortBy] = useState('createdAt');
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Route protection barrier logic
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Metric Calculation Engine
  const calculateStats = useCallback((allTasks) => {
    setStats({
      total: allTasks.length,
      completed: allTasks.filter(t => t.status === 'completed').length,
      'in-progress': allTasks.filter(t => t.status === 'in-progress').length,
      todo: allTasks.filter(t => t.status === 'todo').length,
      'high-priority': allTasks.filter(t => t.priority === 'high').length
    });
  }, []);

  // Client Filter & Sort Processing Engine
  const processTasks = useCallback(() => {
    setLoadingTasks(true);
    let result = [...tasks];

    if (filters.status) result = result.filter(t => t.status === filters.status);
    if (filters.priority) result = result.filter(t => t.priority === filters.priority);
    if (filters.search) {
      result = result.filter(t => 
        t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'priority') {
        const weight = { high: 3, medium: 2, low: 1 };
        return weight[b.priority] - weight[a.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setDisplayedTasks(result);
    calculateStats(tasks);
    setLoadingTasks(false);
  }, [tasks, filters, sortBy, calculateStats]);

  useEffect(() => {
    if (user) {
      processTasks();
    }
  }, [user, processTasks]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const handleAddTask = (taskData) => {
    const newTask = {
      _id: `task-${Date.now()}`,
      ...taskData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleUpdateTask = (taskId, taskData) => {
    setTasks(prev => prev.map(t => t._id === taskId ? { ...t, ...taskData } : t));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t._id !== taskId));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
                tasks={displayedTasks}
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