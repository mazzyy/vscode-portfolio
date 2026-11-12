import React, { useState, useEffect } from 'react';
import InteractiveTerminal from './InteractiveTerminal';

const dockIntro = [
  { t: 'sys', v: "musawar.sh — quick terminal. Type 'help' for commands." },
];

/*
  A fixed launcher button on the LEFT edge that opens an interactive
  terminal drawer. Terminal only — nothing else.
*/
function TerminalDock({ onEnterVSCode, onMatrix, onDownloadCV, onNavigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        className={`mp-dock-btn ${open ? 'active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        title="Open terminal"
        aria-label="Open terminal"
      >
        <i className="fas fa-terminal" />
        <span className="mp-dock-label">terminal</span>
      </button>

      <div className={`mp-dock-overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />

      <aside className={`mp-dock-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mp-term-head mp-dock-head">
          <span className="mp-dot red" onClick={() => setOpen(false)} role="button" aria-label="Close" />
          <span className="mp-dot yellow" />
          <span className="mp-dot green" />
          <span className="mp-term-title">musawar@portfolio: ~ — zsh</span>
          <button className="mp-dock-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>
        {open && (
          <InteractiveTerminal
            variant="drawer"
            initialLines={dockIntro}
            onEnterVSCode={onEnterVSCode}
            onMatrix={onMatrix}
            onDownloadCV={onDownloadCV}
            onGotoTab={() => { setOpen(false); onNavigate && onNavigate('playground'); }}
          />
        )}
      </aside>
    </>
  );
}

export default TerminalDock;
