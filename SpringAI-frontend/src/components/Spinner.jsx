import React from 'react';
import './Spinner.css';

const Spinner = ({ text = 'Processing...' }) => {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="cyber-spinner-wrapper">
        <div className="cyber-spinner-outer"></div>
        <div className="cyber-spinner-inner"></div>
        <div className="cyber-spinner-core"></div>
      </div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default Spinner;

