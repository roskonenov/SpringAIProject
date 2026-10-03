import React from 'react';
import './Spinner.css';

const Spinner = ({ text = 'Processing...' }) => {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default Spinner;
