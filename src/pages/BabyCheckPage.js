/**
 * BabyCheck Page
 * Displays BabyCheck form and results for authenticated users.
 */
import React, { useState } from 'react';
import BabyCheckForm from '../components/BabyCheckForm';

function BabyCheckPage() {
  const [results, setResults] = useState(null);

  return (
    <div className="main-container">
      {/* Main Content */}
      <div className="content-wrapper">
        <div className="container">
          <div className="baby-check-container">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">No Baby No Cry</h2>
                <p className="card-subtitle">
                  Analyze Instagram content for baby-related images and content
                </p>
              </div>
              
              <BabyCheckForm setResults={setResults} />
              
              {/* Results Section */}
              {results && (
                <div className="baby-check-results">
                  {results.images ? (
                    <div>
                      <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        Baby images found ({results.images.length}):
                      </h4>
                      <div className="image-grid">
                        {results.images.map((url, i) => (
                          <div key={i} className="image-item">
                            <a href={url} target="_blank" rel="noreferrer">
                              <img src={url} alt={`Baby ${i + 1}`} />
                              <div className="image-overlay">
                                <span style={{ color: 'white', fontSize: '0.875rem' }}>
                                  View Image
                                </span>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      {results.message}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BabyCheckPage;
