import React, { useState } from 'react';
import InteractiveTerminal from './InteractiveTerminal';
import TypingTest from './TypingTest';
import SnakeGame from './SnakeGame';
import ThemeLab from './ThemeLab';

const TABS = [
  { key: 'terminal', label: 'Terminal', icon: 'fa-terminal' },
  { key: 'typing', label: 'Typing Test', icon: 'fa-keyboard' },
  { key: 'snake', label: 'Snake', icon: 'fa-gamepad' },
  { key: 'theme', label: 'Theme Lab', icon: 'fa-palette' },
];

function Playground({ onEnterVSCode, onMatrix, onDownloadCV }) {
  const [tab, setTab] = useState('terminal');

  return (
    <section id="playground" className="mp-section">
      <div className="mp-section-head reveal">
        <span className="mp-section-index">04.</span>
        <h2 className="mp-section-title">playground<span className="mp-grad">()</span></h2>
        <div className="mp-section-rule" />
      </div>
      <p className="mp-section-lead reveal">
        Poke around. A real shell, a typing test, Snake, and a live theme editor — because a dev portfolio should be playable.
      </p>

      <div className="mp-pg reveal">
        <div className="mp-pg-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`mp-pg-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              <i className={`fas ${t.icon}`} /> <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="mp-pg-panel">
          {tab === 'terminal' && (
            <InteractiveTerminal
              onEnterVSCode={onEnterVSCode}
              onMatrix={onMatrix}
              onDownloadCV={onDownloadCV}
              onGotoTab={setTab}
            />
          )}
          {tab === 'typing' && <TypingTest />}
          {tab === 'snake' && <SnakeGame />}
          {tab === 'theme' && <ThemeLab />}
        </div>
      </div>
    </section>
  );
}

export default Playground;
