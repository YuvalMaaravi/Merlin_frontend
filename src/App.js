/**
 * Main App Component
 * Handles routing and authentication state for the frontend.
 */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import TrackerPage from './pages/TrackerPage';
import BabyCheckPage from './pages/BabyCheckPage';
import Navigation from './components/Navigation';
import { getToken } from './utils/auth';

// PrivateRoute: restricts access to authenticated users
function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount and when token changes
    const checkAuth = () => {
      setIsAuthenticated(!!getToken());
    };
    checkAuth();
    // Listen for storage changes (when token is set/removed)
    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener('storage', handleStorageChange);
    // Also check periodically for immediate updates
    const interval = setInterval(checkAuth, 100);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Show navigation only when authenticated */}
        {isAuthenticated && <Navigation />}
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/tracker" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TrackerPage />
            </PrivateRoute>
          } />
          <Route path="/babycheck" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <BabyCheckPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
