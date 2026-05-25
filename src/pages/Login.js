import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // --- MOCK TESTING BYPASS ---
    // Try signing in using: admin@workspace.com / password123
    if (formData.email === 'admin@workspace.com' && formData.password === 'password123') {
      setTimeout(() => {
        const dummyUser = {
          name: 'Alex Crimson',
          email: 'admin@workspace.com',
          role: 'Administrator'
        };
        const dummyToken = 'mock-jwt-token-xyz123';
        
        // Save profile to context & localStorage
        login(dummyUser, dummyToken);
        setLoading(false);
        navigate('/dashboard');
      }, 700); // 700ms simulation lag for realism
      return;
    }
    
    // Fallback error if credentials do not match dummy details
    setTimeout(() => {
      setError('Invalid credentials. Hint: use admin@workspace.com & password123');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="form-subtitle">Use <strong>admin@workspace.com</strong> & <strong>password123</strong></p>
        
        {error && <div className="error-message">⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Securing Session...' : 'Sign In To Workspace →'}
          </button>
        </form>
        
        <p className="auth-link">
          New to the hub? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;