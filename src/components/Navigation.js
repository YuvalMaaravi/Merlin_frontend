/**
 * Navigation Component
 * Displays navigation links and handles logout.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clearToken } from '../utils/auth';

function Navigation() {
  const location = useLocation();

  // Handle logout: clear token and redirect to login
  const handleLogout = () => {
    clearToken();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          Merlin AI
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/tracker" 
              className={`nav-link ${location.pathname === '/tracker' ? 'active' : ''}`}
            >
              InstaTracker
            </Link>
          </li>
          <li>
            <Link 
              to="/babycheck" 
              className={`nav-link ${location.pathname === '/babycheck' ? 'active' : ''}`}
            >
              No Baby No Cry
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navigation;