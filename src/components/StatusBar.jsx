import React from 'react';

function StatusBar({ onToggleTerminal, currentTheme }) {
  return (
    <div className="status-bar">
      <div className="status-left">
        <div className="status-item clickable" onClick={onToggleTerminal}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 17l6-6-6-6M12 19h8"/>
          </svg>
          <span>Terminal</span>
        </div>
        <div className="status-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="18" r="3"/>
            <circle cx="6" cy="6" r="3"/>
            <path d="M6 21V9a9 9 0 009 9"/>
          </svg>
          <span>main</span>
        </div>
      </div>
      <div className="status-right">
        <div className="status-item">
          <span className="theme-badge">{currentTheme}</span>
        </div>
        <div className="status-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
