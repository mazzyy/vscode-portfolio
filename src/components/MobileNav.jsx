import React, { useEffect } from 'react';

function MobileNav({ isOpen, activeTab, onClose, onSwitchTab, onDownloadCV, onToggleTerminal, onExitToModern }) {
  const navItems = [
    { id: 'about', label: 'about.tsx', type: 'ts' },
    { id: 'projects', label: 'projects.tsx', type: 'ts' },
    { id: 'videos', label: 'videos.tsx', type: 'ts' },
    { id: 'contact', label: 'contact.tsx', type: 'ts' },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Navigation Drawer */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <span>EXPLORER</span>
          <div className="mobile-nav-close" onClick={onClose}>×</div>
        </div>
        
        <div className="mobile-nav-items">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
              data-mobile-tab={item.id}
              onClick={() => onSwitchTab(item.id)}
            >
              <span className={`nav-icon ${item.type}`}></span>
              <span>{item.label}</span>
            </div>
          ))}
          
          <div className="mobile-nav-divider"></div>
          
          <div className="mobile-nav-item" onClick={onDownloadCV}>
            <span className="nav-icon pdf"></span>
            <span>resume.pdf</span>
          </div>
          
          <div className="mobile-nav-item" onClick={onToggleTerminal}>
            <span className="nav-icon term"></span>
            <span>Terminal</span>
          </div>

          {onExitToModern && (
            <>
              <div className="mobile-nav-divider"></div>
              <div className="mobile-nav-item" onClick={onExitToModern}>
                <span className="nav-icon" style={{ color: '#00ffc3' }}>✦</span>
                <span>Switch to Modern view</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MobileNav;
