/**
 * Signup Form Component
 * Handles user registration and navigation to login.
 */
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import api from "../api";

function SignupForm() {
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
      await api.post('/auth/signup', { email, password });
      setMessage('User created successfully! Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error registering user');
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
                <h2 className="card-title">Create Account</h2>
                <p className="card-subtitle">Join us to get started</p>
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
                    placeholder="Create a password"
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
                        Signing up...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>
                
                {message && (
                  <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'} mt-4`}>
                    {message}
                  </div>
                )}
              </form>
              
              <div className="text-center mt-4">
                <p>
                  Already have an account?{' '}
                  <Link to="/login">
                    Login
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

export default SignupForm;