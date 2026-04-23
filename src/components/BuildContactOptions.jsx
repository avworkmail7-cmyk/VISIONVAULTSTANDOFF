import React from 'react';

const BuildContactOptions = ({ onClose, email, phone }) => {
  return (
    <div className="build-contact-options-overlay">
      <div className="build-contact-options-content">
        <button className="build-contact-options-close" onClick={onClose}>&times;</button>
        <h3>How would you like to connect?</h3>
        <div className="build-contact-options-actions">
          <a href={`mailto:${email}`} className="build-contact-option-btn">Email Us</a>
          <a href={`tel:${phone}`} className="build-contact-option-btn">Call/Text Us</a>
        </div>
      </div>
    </div>
  );
};

export default BuildContactOptions;