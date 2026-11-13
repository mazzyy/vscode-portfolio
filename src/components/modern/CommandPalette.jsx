import React, { useState, useRef, useEffect, useMemo } from 'react';

function CommandPalette({ onClose, onNavigate, onEnterVSCode, onDownloadCV, onMatrix }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => [
    { id: 'home', label: 'Go to Home', icon: 'fa-house', run: () => onNavigate('home') },
    { id: 'about', label: 'Go to About', icon: 'fa-user', run: () => onNavigate('about') },
    { id: 'projects', label: 'Go to Projects', icon: 'fa-folder-open', run: () => onNavigate('projects') },
    { id: 'experience', label: 'Go to Experience', icon: 'fa-briefcase', run: () => onNavigate('experience') },
    { id: 'contact', label: 'Go to Contact', icon: 'fa-envelope', run: () => onNavigate('contact') },
    { id: 'cv', label: 'Download CV / Resume', icon: 'fa-download', run: () => onDownloadCV() },
    { id: 'vscode', label: 'Switch to VS Code mode', icon: 'fa-code', run: () => onEnterVSCode() },
    { id: 'github', label: 'Open GitHub', icon: 'fa-github', brand: true, run: () => window.open('https://github.com/mazzyy', '_blank') },
    { id: 'linkedin', label: 'Open LinkedIn', icon: 'fa-linkedin', brand: true, run: () => window.open('https://www.linkedin.com/in/musawar/', '_blank') },
    { id: 'matrix', label: 'Enter the Matrix', icon: 'fa-terminal', run: () => onMatrix() },
  ], [onNavigate, onEnterVSCode, onDownloadCV, onMatrix]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.id.includes(q));
  }, [query, commands]);

  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  useEffect(() => { setActive(0); }, [query]);

  const exec = (cmd) => { if (!cmd) return; cmd.run(); onClose(); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); exec(filtered[active]); }
    else if (e.key === 'Escape') { onClose(); }
  };

  return (
    <div className="mp-cmd-overlay" onClick={onClose}>
      <div className="mp-cmd" onClick={(e) => e.stopPropagation()}>
        <div className="mp-cmd-input">
          <i className="fas fa-magnifying-glass" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            spellCheck="false"
          />
          <span className="mp-kbd">esc</span>
        </div>
        <div className="mp-cmd-list">
          {filtered.length === 0 && <div className="mp-cmd-empty">No matches</div>}
          {filtered.map((c, i) => (
            <button
              key={c.id}
              className={`mp-cmd-item ${i === active ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => exec(c)}
            >
              <i className={`${c.brand ? 'fab' : 'fas'} ${c.icon}`} />
              <span>{c.label}</span>
              {i === active && <i className="fas fa-turn-down mp-cmd-enter" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
