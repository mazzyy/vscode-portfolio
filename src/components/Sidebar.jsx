import React, { useState } from 'react';

function Sidebar({ activeSection, activeTab, onSwitchTab, onDownloadCV }) {
  const [searchTerm, setSearchTerm] = useState('');

  const files = [
    { name: 'about.tsx', type: 'ts', tab: 'about', nested: 2 },
    { name: 'projects.tsx', type: 'ts', tab: 'projects', nested: 2 },
    { name: 'videos.tsx', type: 'ts', tab: 'videos', nested: 2 },
    { name: 'contact.tsx', type: 'ts', tab: 'contact', nested: 2 },
  ];

  const rootFiles = [
    { name: 'package.json', type: 'json' },
    { name: 'resume.pdf', type: 'pdf', onClick: onDownloadCV },
  ];

  const tips = [
    { icon: '⌨️', title: 'Command Palette', desc: 'Press Ctrl+P to quick search files' },
    { icon: '🎨', title: 'Theme Switcher', desc: 'Click settings gear to cycle 4 themes' },
    { icon: '💻', title: 'Terminal', desc: 'Type "help" for available commands' },
    { icon: '📁', title: 'File Explorer', desc: 'Click files to navigate sections' },
    { icon: '🔍', title: 'Search', desc: 'Use search icon to filter files' },
    { icon: '📥', title: 'Download CV', desc: 'Click resume.pdf to download' },
    { icon: '▶️', title: 'Run Button', desc: 'Simulates build process in terminal' },
    { icon: '📱', title: 'Mobile Menu', desc: 'Hamburger menu on mobile devices' },
  ];

  const commits = [
    { hash: 'd41d8cd', date: 'Jan 2024', message: 'feat: Joined Siemens Healthineers' },
    { hash: 'a1b2c3d', date: 'Sep 2022', message: 'fix: Infrastructure at PUMA' },
    { hash: '98f7e6d', date: 'Jun 2021', message: 'init: Co-founded Asaan Recovery' },
    { hash: 'f5e4d3c', date: 'Oct 2021', message: 'feat: Started MSc at FAU' },
  ];

  const filteredFiles = searchTerm
    ? [...files, ...rootFiles].filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : null;

  const renderExplorer = () => (
    <div className="sidebar-section">
      <div className="sidebar-section-header">
        <span>▼</span> MUSAWAR.PORTFOLIO
      </div>
      <div className="file-tree">
        <div className="folder-item">
          <i className="fas fa-folder folder-icon"></i> src
        </div>
        <div className="folder-item nested-1">
          <i className="fas fa-folder-open folder-icon"></i> pages
        </div>
        
        {files.map(file => (
          <div
            key={file.name}
            className={`file-item ${file.type} nested-${file.nested} ${activeTab === file.tab ? 'active' : ''}`}
            onClick={() => onSwitchTab(file.tab)}
          >
            {file.name}
          </div>
        ))}
        
        {rootFiles.map(file => (
          <div
            key={file.name}
            className={`file-item ${file.type}`}
            onClick={file.onClick}
            style={file.onClick ? { cursor: 'pointer' } : {}}
          >
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div style={{ padding: '10px' }}>
      <input
        type="text"
        placeholder="Search files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        autoFocus
      />
      <div className="file-tree" style={{ marginTop: '10px' }}>
        {(filteredFiles || [...files, ...rootFiles]).map(file => (
          <div
            key={file.name}
            className={`file-item ${file.type} ${file.tab && activeTab === file.tab ? 'active' : ''}`}
            style={{ paddingLeft: '24px' }}
            onClick={() => {
              if (file.tab) onSwitchTab(file.tab);
              if (file.onClick) file.onClick();
            }}
          >
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );

  const renderGit = () => (
    <div style={{ padding: '10px', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
      <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Repositories</span>
        <span style={{ background: 'var(--accent-blue)', padding: '0 8px', borderRadius: '10px', color: 'white', fontSize: '0.75rem' }}>59</span>
      </div>
      
      <div className="git-history">
        <div style={{ color: 'var(--syntax-comment)', marginBottom: '10px', fontWeight: 'bold' }}>COMMITS</div>
        
        {commits.map(commit => (
          <div key={commit.hash} className="commit-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--syntax-function)' }}>●</span>
              <span style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>{commit.message}</span>
            </div>
            <div style={{ paddingLeft: '18px', color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>
              {commit.hash} • {commit.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTips = () => (
    <div style={{ padding: '10px' }}>
      <div style={{ 
        padding: '12px', 
        background: 'var(--bg-active)', 
        borderRadius: '6px', 
        marginBottom: '15px',
        borderLeft: '3px solid var(--neon-green)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
          <span style={{ fontSize: '1.2rem' }}>💡</span>
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Interactive Portfolio</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          This portfolio mimics VS Code. Explore the features below!
        </p>
      </div>
      
      <div className="tips-container">
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">
            <span className="tip-icon">{tip.icon}</span>
            <div className="tip-content">
              <div className="tip-title">{tip.title}</div>
              <div className="tip-desc">{tip.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getSidebarContent = () => {
    switch (activeSection) {
      case 'search':
        return renderSearch();
      case 'git':
        return renderGit();
      case 'tips':
        return renderTips();
      default:
        return renderExplorer();
    }
  };

  const getHeaderText = () => {
    switch (activeSection) {
      case 'search':
        return 'SEARCH';
      case 'git':
        return 'SOURCE CONTROL';
      case 'tips':
        return 'FEATURES';
      default:
        return 'EXPLORER';
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {getHeaderText()}
      </div>
      {getSidebarContent()}
    </div>
  );
}

export default Sidebar;
