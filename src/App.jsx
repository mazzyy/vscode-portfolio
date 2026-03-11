import React, { useState, useCallback, useEffect } from 'react';
import TitleBar from './components/TitleBar';
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import EditorArea from './components/EditorArea';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import CommandPalette from './components/CommandPalette';
import MobileNav from './components/MobileNav';

// Theme configurations
const themes = {
  dark: {
    name: 'Dark+',
    '--bg-primary': '#1e1e1e',
    '--bg-secondary': '#252526',
    '--bg-tertiary': '#2d2d30',
    '--bg-editor': '#1e1e1e',
    '--bg-terminal': '#0d0d0d',
    '--bg-sidebar': '#181818',
    '--bg-active': '#37373d',
    '--bg-hover': '#2a2d2e',
    '--text-primary': '#d4d4d4',
    '--text-secondary': '#858585',
    '--text-muted': '#6e6e6e',
    '--text-white': '#ffffff',
    '--border': '#3c3c3c',
    '--syntax-keyword': '#569cd6',
    '--syntax-string': '#ce9178',
    '--syntax-function': '#dcdcaa',
    '--syntax-comment': '#6a9955',
    '--syntax-variable': '#9cdcfe',
    '--accent-blue': '#007acc',
    '--neon-green': '#00ff9d',
    '--neon-blue': '#00d4ff',
    '--neon-purple': '#b14eff',
    '--accent-cyan': '#4fc1ff',
    '--accent-red': '#f14c4c',
    '--glow-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
    '--glow-green': '0 0 20px rgba(0, 255, 157, 0.5)',
  },
  light: {
    name: 'Light+',
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8f8f8',
    '--bg-tertiary': '#f0f0f0',
    '--bg-editor': '#ffffff',
    '--bg-terminal': '#f5f5f5',
    '--bg-sidebar': '#f3f3f3',
    '--bg-active': '#e4e6f1',
    '--bg-hover': '#e8e8e8',
    '--text-primary': '#1e1e1e',
    '--text-secondary': '#505050',
    '--text-muted': '#767676',
    '--text-white': '#1e1e1e',
    '--border': '#d4d4d4',
    '--syntax-keyword': '#0000ff',
    '--syntax-string': '#a31515',
    '--syntax-function': '#795e26',
    '--syntax-comment': '#008000',
    '--syntax-variable': '#001080',
    '--accent-blue': '#005fb8',
    '--neon-green': '#16825d',
    '--neon-blue': '#0066cc',
    '--neon-purple': '#6f42c1',
    '--accent-cyan': '#0077b6',
    '--accent-red': '#d11515',
    '--glow-blue': '0 0 15px rgba(0, 102, 204, 0.2)',
    '--glow-green': '0 0 15px rgba(22, 130, 93, 0.2)',
  },
  blue: {
    name: 'Ocean Blue',
    '--bg-primary': '#0a1628',
    '--bg-secondary': '#0d1f3c',
    '--bg-tertiary': '#132744',
    '--bg-editor': '#0a1628',
    '--bg-terminal': '#060f1f',
    '--bg-sidebar': '#081422',
    '--bg-active': '#1a3a5c',
    '--bg-hover': '#15304d',
    '--text-primary': '#e1e8f0',
    '--text-secondary': '#8ba3c1',
    '--text-muted': '#5d7a99',
    '--text-white': '#ffffff',
    '--border': '#1e4976',
    '--syntax-keyword': '#64b5f6',
    '--syntax-string': '#81c784',
    '--syntax-function': '#ffcc80',
    '--syntax-comment': '#546e7a',
    '--syntax-variable': '#80deea',
    '--accent-blue': '#2196f3',
    '--neon-green': '#00e676',
    '--neon-blue': '#40c4ff',
    '--neon-purple': '#7c4dff',
    '--accent-cyan': '#00bcd4',
    '--accent-red': '#ff5252',
    '--glow-blue': '0 0 25px rgba(33, 150, 243, 0.4)',
    '--glow-green': '0 0 25px rgba(0, 230, 118, 0.4)',
  },
  midnight: {
    name: 'Midnight Purple',
    '--bg-primary': '#13111c',
    '--bg-secondary': '#1a1726',
    '--bg-tertiary': '#221f2e',
    '--bg-editor': '#13111c',
    '--bg-terminal': '#0c0a14',
    '--bg-sidebar': '#100e18',
    '--bg-active': '#2d2843',
    '--bg-hover': '#252139',
    '--text-primary': '#e4e0f0',
    '--text-secondary': '#9d95b8',
    '--text-muted': '#6b6488',
    '--text-white': '#ffffff',
    '--border': '#3d3656',
    '--syntax-keyword': '#c792ea',
    '--syntax-string': '#c3e88d',
    '--syntax-function': '#82aaff',
    '--syntax-comment': '#676e95',
    '--syntax-variable': '#f78c6c',
    '--accent-blue': '#7c3aed',
    '--neon-green': '#a5d6a7',
    '--neon-blue': '#b388ff',
    '--neon-purple': '#ea80fc',
    '--accent-cyan': '#84ffff',
    '--accent-red': '#f07178',
    '--glow-blue': '0 0 25px rgba(124, 58, 237, 0.4)',
    '--glow-green': '0 0 25px rgba(165, 214, 167, 0.4)',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [activeSection, setActiveSection] = useState('explorer');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'info', text: 'Welcome to the integrated terminal.' },
    { type: 'info', text: "Type 'help' for available commands." }
  ]);

  // Apply theme
  const applyTheme = useCallback((themeName) => {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([key, value]) => {
      if (key.startsWith('--')) {
        root.style.setProperty(key, value);
      }
    });
    
    setCurrentTheme(themeName);
  }, []);

  // Cycle through themes
  const cycleTheme = useCallback(() => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    applyTheme(themeKeys[nextIndex]);
  }, [currentTheme, applyTheme]);

  const switchTab = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen(prev => !prev);
  }, []);

  const togglePalette = useCallback(() => {
    setIsPaletteOpen(prev => !prev);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(prev => !prev);
  }, []);

  const downloadCV = useCallback(() => {
    setTerminalOutput(prev => [...prev, { type: 'command', text: 'download resume.pdf' }]);
    
    const steps = [
      { text: 'Connecting to server...', delay: 200 },
      { text: 'Downloading: [##########] 100%', delay: 800, type: 'success' },
      { text: 'Saved to downloads.', delay: 1000, type: 'success' }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, { type: step.type || 'muted', text: step.text }]);
      }, step.delay);
    });

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = 'resume.pdf';
      link.download = 'Abdul_Musawar_Soomro_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  }, []);

  const runCode = useCallback(() => {
    if (!isTerminalOpen) setIsTerminalOpen(true);
    
    const time = new Date().toLocaleTimeString();
    setTerminalOutput(prev => [
      ...prev,
      { type: 'command', text: 'npm run dev' },
      { type: 'muted', text: `[${time}] Compiling...` },
      { type: 'success', text: '✔ Ready at http://localhost:3000' }
    ]);
  }, [isTerminalOpen]);

  const addTerminalOutput = useCallback((output) => {
    setTerminalOutput(prev => [...prev, output]);
  }, []);

  const clearTerminal = useCallback(() => {
    setTerminalOutput([]);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === 'Escape') {
        if (isPaletteOpen) togglePalette();
        if (isMobileNavOpen) toggleMobileNav();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPaletteOpen, isMobileNavOpen, togglePalette, toggleMobileNav]);

  // Close mobile nav on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileNavOpen]);

  return (
    <>
      {isPaletteOpen && (
        <CommandPalette
          onClose={togglePalette}
          onSwitchTab={switchTab}
          onDownloadCV={downloadCV}
        />
      )}

      <div className="vscode-container">
        <TitleBar 
          onToggleMobileMenu={toggleMobileNav} 
          currentTheme={themes[currentTheme].name}
        />

        <MobileNav
          isOpen={isMobileNavOpen}
          activeTab={activeTab}
          onClose={toggleMobileNav}
          onSwitchTab={(tab) => { switchTab(tab); toggleMobileNav(); }}
          onDownloadCV={() => { downloadCV(); toggleMobileNav(); }}
          onToggleTerminal={() => { toggleTerminal(); toggleMobileNav(); }}
        />

        <ActivityBar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onToggleTheme={cycleTheme}
          currentTheme={currentTheme}
        />

        <Sidebar
          activeSection={activeSection}
          activeTab={activeTab}
          onSwitchTab={switchTab}
          onDownloadCV={downloadCV}
        />

        <EditorArea
          activeTab={activeTab}
          onSwitchTab={switchTab}
          onRunCode={runCode}
        />

        <Terminal
          isOpen={isTerminalOpen}
          output={terminalOutput}
          onClose={toggleTerminal}
          onSwitchTab={switchTab}
          onDownloadCV={downloadCV}
          addOutput={addTerminalOutput}
          clearOutput={clearTerminal}
        />

        <StatusBar 
          onToggleTerminal={toggleTerminal}
          currentTheme={themes[currentTheme].name}
        />
      </div>
    </>
  );
}

export default App;
