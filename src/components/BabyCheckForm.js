/**
 * BabyCheck Form Component
 * Handles Instagram username input and fetches baby-related images.
 */
import React, { useState } from 'react';
import api from '../api';

function BabyCheckForm({ setResults }) {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [nextMaxId, setNextMaxId] = useState(null);
  const [images, setImages] = useState([]);

  // Fetch images for a page (with optional cursor)
  async function fetchPage({ cursor } = {}) {
    setLoading(true);
    setMessage('');
    try {
      const url = cursor
        ? `/babycheck/${encodeURIComponent(username)}?cursor=${encodeURIComponent(cursor)}`
        : `/babycheck/${encodeURIComponent(username)}`;
      const res = await api.get(url);
      const newImages = Array.isArray(res.data?.images) ? res.data.images : [];

      // Append or replace based on whether this is the first page
      setImages((prev) => (cursor ? [...prev, ...newImages] : newImages));
      setNextMaxId(res.data?.next_max_id || null);

      // Report up to parent (if it wants to render the list)
      setResults({
        username,
        images: cursor ? [...images, ...newImages] : newImages,
        next_max_id: res.data?.next_max_id || null,
        message: res.data?.message || null,
      });

      if (res.data?.message && newImages.length === 0) {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error checking images');
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setImages([]);
    setNextMaxId(null);
    if (!username.trim()) {
      setMessage('Please enter a username.');
      return;
    }
    await fetchPage(); // first page
  }

  // Handle loading next page (pagination)
  async function handleLoadMore() {
    if (nextMaxId && !loading) {
      await fetchPage({ cursor: nextMaxId });
    }
  }

  return (
    <div className="baby-check-form">
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
                Checking...
              </>
            ) : (
              'Check for Baby Images'
            )}
          </button>
        </div>

        {nextMaxId && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleLoadMore}
              disabled={loading}
              style={{ minWidth: '200px' }}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

        {message && (
          <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-info'} mt-4`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default BabyCheckForm;
