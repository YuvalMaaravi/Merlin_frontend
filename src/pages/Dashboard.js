/**
 * Dashboard Page
 * Main landing page with links to features.
 */
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="main-container">
      {/* Main Content */}
      <div className="content-wrapper">
        <div className="container">
          <div className="dashboard">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Welcome to Merlin AI</h1>
            </div>
            <div className="dashboard-grid">
              {/* InstaTracker Card */}
              <Link to="/tracker" className="dashboard-card">
                <div className="dashboard-card-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                  </svg>
                </div>
                <h3 className="dashboard-card-title">InstaTracker</h3>
                <p className="dashboard-card-description">
                  Track and monitor Instagram accounts with advanced analytics and insights.
                </p>
              </Link>
              {/* No Baby No Cry Card */}
              <Link to="/babycheck" className="dashboard-card">
                <div className="dashboard-card-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                    <circle cx="12" cy="13" r="3"/>
                  </svg>
                </div>
                <h3 className="dashboard-card-title">No Baby No Cry</h3>
                <p className="dashboard-card-description">
                  Analyze Instagram content for baby-related images and content.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
