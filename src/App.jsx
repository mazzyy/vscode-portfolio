import React, { useState, useEffect, useCallback } from 'react';
import VSCodeApp from './VSCodeApp';
import ModernPortfolio from './ModernPortfolio';
import './modern.css';

const STORAGE_KEY = 'portfolio-mode';

function getInitialMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'vscode' || saved === 'modern') return saved;
  } catch (e) { /* ignore */ }
  return 'modern';
}

function App() {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) { /* ignore */ }
    document.body.classList.toggle('mode-modern', mode === 'modern');
    document.body.classList.toggle('mode-vscode', mode === 'vscode');
  }, [mode]);

  const goVSCode = useCallback(() => {
    setMode('vscode');
    window.scrollTo(0, 0);
  }, []);

  const goModern = useCallback(() => {
    setMode('modern');
    window.scrollTo(0, 0);
  }, []);

  return mode === 'vscode'
    ? <VSCodeApp onExitToModern={goModern} />
    : <ModernPortfolio onEnterVSCode={goVSCode} />;
}

export default App;
