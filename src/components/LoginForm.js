/**
 * Login Form Component
 * Handles user login and authentication state update.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { setToken } from '../utils/auth';

function LoginForm({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      setIsAuthenticated(true); // Update authentication state
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="container">
          <div className="form-container">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Welcome Back</h2>
                <p className="card-subtitle">Sign in to your account to continue</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ minWidth: '200px' }}
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner"></div>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
                
                {message && (
                  <div className="alert alert-error mt-4">
                    {message}
                  </div>
                )}
              </form>
              
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" >
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
