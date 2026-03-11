import React, { useState, useEffect, useRef } from 'react';

function CommandPalette({ onClose, onSwitchTab, onDownloadCV }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const items = [
    { name: 'about.tsx', path: 'pages', action: () => onSwitchTab('about') },
    { name: 'projects.tsx', path: 'pages', action: () => onSwitchTab('projects') },
    { name: 'videos.tsx', path: 'pages', action: () => onSwitchTab('videos') },
    { name: 'contact.tsx', path: 'pages', action: () => onSwitchTab('contact') },
    { name: 'resume.pdf', path: 'download', action: onDownloadCV }
  ];

  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const select = (item) => {
    item.action();
    onClose();
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => (s + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => (s - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[selected]) {
      select(filtered[selected]);
    }
  };

  return (
    <div className="palette-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette-container">
        <div className="palette-input-wrapper">
          <span>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            id="palette-input"
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>
        <div className="palette-results">
          {filtered.map((item, i) => (
            <div
              key={item.name}
              className={`palette-item ${i === selected ? 'selected' : ''}`}
              onClick={() => select(item)}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="palette-item-name">{item.name}</span>
              <span className="palette-item-path">{item.path}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
