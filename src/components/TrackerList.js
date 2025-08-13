/**
 * Tracker List Component
 * Displays list of tracked Instagram accounts and allows removal.
 */
import React, { useState } from 'react';
import api from '../api';

function TrackerList({ trackers, onRemove }) {
  const [removingId, setRemovingId] = useState(null);

  // Handle tracker removal
  async function handleRemove(id) {
    try {
      setRemovingId(id);
      await api.delete(`/tracker/remove/${id}`);
      onRemove(id);
    } catch (err) {
      console.error('Error removing', err);
    } finally {
      setRemovingId(null);
    }
  }

  if (trackers.length === 0) {
    return (
      <div className="tracker-list">
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '1rem' }}>
            {/* Empty state icon */}
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-light)' }}>
              <path d="M3 3v18h18"/>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
            </svg>
          </div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No Trackers Yet</h3>
          <p>Add your first Instagram tracker to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tracker-list">
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Tracked Accounts</h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {trackers.map((t) => (
          <div key={t._id} className="tracker-item">
            <div className="tracker-item-info">
              <div className="tracker-item-title">
                @{t.instagramUsername}
              </div>
              <div className="tracker-item-description">
                Following: {t.baselineFollowing.length} accounts  Email: {t.email}
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleRemove(t._id)}
              disabled={removingId === t._id}
            >
              {removingId === t._id ? 'Removing...' : 'Remove'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackerList;
