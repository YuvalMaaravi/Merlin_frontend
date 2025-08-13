/**
 * Tracker Page
 * Displays tracker list and add tracker form for authenticated users.
 */
import React, { useState, useEffect } from 'react';
import api from '../api';
import AddTrackerForm from '../components/AddTrackerForm';
import TrackerList from '../components/TrackerList';

function TrackerPage() {
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trackers from API
  async function fetchTrackers() {
    try {
      setLoading(true);
      const res = await api.get('/tracker/list');
      setTrackers(res.data);
    } catch (error) {
      console.error('Error fetching trackers:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    fetchTrackers(); 
  }, []);

  // Add new tracker to list
  function handleAdd(newTracker) {
    setTrackers([...trackers, newTracker]);
  }

  // Remove tracker from list
  function handleRemove(id) {
    setTrackers(trackers.filter(t => t._id !== id));
  }

  return (
    <div className="main-container">
      {/* Main Content */}
      <div className="content-wrapper">
        <div className="container">
          <div className="tracker-container">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">InstaTracker</h2>
                <p className="card-subtitle">
                  Track and monitor Instagram accounts with advanced analytics
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                <div>
                  <AddTrackerForm onAdd={handleAdd} />
                </div>
                <div>
                  {loading ? (
                    <div className="loading">
                      <div className="loading-spinner"></div>
                      Loading trackers...
                    </div>
                  ) : (
                    <TrackerList trackers={trackers} onRemove={handleRemove} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackerPage;
