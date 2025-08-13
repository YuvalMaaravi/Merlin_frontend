/**
 * Add Tracker Form Component
 * Handles adding new Instagram trackers for notifications.
 */
import React, { useState } from 'react';
import api from '../api';

function AddTrackerForm({ onAdd }) {
  const [username, setUsername] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await api.post('/tracker/add', {
        instagramUsername: username,
        email: notificationEmail,
      });
      onAdd(res.data); // update list in parent
      setUsername('');
      setNotificationEmail('');
      setMessage('Tracker added successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding tracker');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tracker-form">
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', textAlign: 'center' }}>Add New Tracker</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Instagram Username</label>
          <input
            id="username"
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram username"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="email">Notification Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={notificationEmail}
            onChange={(e) => setNotificationEmail(e.target.value)}
            placeholder="Enter notification email"
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
                Adding Tracker...
              </>
            ) : (
              'Add Tracker'
            )}
          </button>
        </div>
        
        {message && (
          <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'} mt-4`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddTrackerForm;
