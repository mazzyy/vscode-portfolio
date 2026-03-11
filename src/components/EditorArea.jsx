import React from 'react';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import VideosSection from './sections/VideosSection';
import ContactSection from './sections/ContactSection';

function EditorArea({ activeTab, onSwitchTab, onRunCode }) {
  const tabs = [
    { id: 'about', name: 'about.tsx' },
    { id: 'projects', name: 'projects.tsx' },
    { id: 'videos', name: 'videos.tsx' },
    { id: 'contact', name: 'contact.tsx' },
  ];

  return (
    <div className="editor-area">
      {/* Editor Tabs */}
      <div className="editor-tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`editor-tab ${activeTab === tab.id ? 'active' : ''}`}
            data-tab={tab.id}
            onClick={() => onSwitchTab(tab.id)}
          >
            <span style={{ color: '#3178c6' }}>TS</span>
            {tab.name}
            <span className="close-tab">×</span>
          </div>
        ))}
        
        <div style={{ flex: 1, borderBottom: '1px solid var(--border)', background: 'var(--bg-tertiary)' }}></div>
        
        <div className="run-button" onClick={onRunCode} title="Run Project (Ctrl+R)">
          <span style={{ fontSize: '0.8rem', marginRight: '5px', color: 'var(--text-muted)' }}>Run</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-green)">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Editor Content */}
      <div className="editor-content">
        <div className={`content-section ${activeTab === 'about' ? 'active' : ''}`} id="about-section">
          <AboutSection />
        </div>
        
        <div className={`content-section ${activeTab === 'projects' ? 'active' : ''}`} id="projects-section">
          <ProjectsSection />
        </div>
        
        <div className={`content-section ${activeTab === 'videos' ? 'active' : ''}`} id="videos-section">
          <VideosSection />
        </div>
        
        <div className={`content-section ${activeTab === 'contact' ? 'active' : ''}`} id="contact-section">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export default EditorArea;
