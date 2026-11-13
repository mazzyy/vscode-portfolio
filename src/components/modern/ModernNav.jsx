import React, { useState } from 'react';

const LINKS = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
];

function ModernNav({ activeSection, onNavigate, onOpenPalette, onEnterVSCode }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="mp-nav">
      <button className="mp-logo" onClick={() => go('home')} aria-label="Home">
        <span className="mp-logo-bracket">{'<'}</span>
        <span className="mp-logo-name">musawar</span>
        <span className="mp-logo-bracket">{'/>'}</span>
        <span className="mp-logo-cursor" />
      </button>

      <nav className={`mp-nav-links ${open ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <button
            key={l.id}
            className={`mp-nav-link ${activeSection === l.id ? 'active' : ''}`}
            onClick={() => go(l.id)}
          >
            <span className="mp-nav-dot">#</span>{l.label}
          </button>
        ))}
      </nav>

      <div className="mp-nav-actions">
        <button className="mp-kbd-btn" onClick={onOpenPalette} title="Command palette (⌘K / Ctrl+K)">
          <i className="fas fa-magnifying-glass" />
          <span className="mp-kbd">⌘K</span>
        </button>

        <button className="mp-switch-btn" onClick={onEnterVSCode} title="Open the VS Code editor experience">
          <i className="fas fa-code" />
          <span>VS Code mode</span>
        </button>

        <button
          className={`mp-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default ModernNav;
