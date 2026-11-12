import React from 'react';

function TitleBar({ onToggleMobileMenu, onExitToModern }) {
  return (
    <div className="title-bar">
      <div className="title-bar-controls">
        <div className="control-btn close"></div>
        <div className="control-btn minimize"></div>
        <div className="control-btn maximize"></div>
      </div>

      <div className="mobile-menu-btn" onClick={onToggleMobileMenu}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </div>

      <div className="title-bar-title">
        <span>musawar.portfolio</span> — Visual Studio Code
      </div>

      {onExitToModern ? (
        <button className="exit-modern-btn" onClick={onExitToModern} title="Switch to the Modern experience">
          <i className="fas fa-wand-magic-sparkles"></i>
          <span>Modern view</span>
        </button>
      ) : (
        <div style={{ width: '70px' }}></div>
      )}
    </div>
  );
}

export default TitleBar;
