import React, { useState, useRef, useEffect } from 'react';

function Terminal({ isOpen, output, onClose, onSwitchTab, onDownloadCV, addOutput, clearOutput }) {
  const [inputValue, setInputValue] = useState('');
  const termBodyRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: `Commands: <span class='keyword'>open [about|projects|videos|contact]</span>, <span class='keyword'>download cv</span>, <span class='keyword'>clear</span>, <span class='keyword'>whoami</span>`,
    whoami: "Abdul Musawar Soomro - Kubernetes Developer @ Siemens Healthineers",
    clear: "CLEAR"
  };

  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim().toLowerCase();
      
      addOutput({ type: 'command', text: inputValue });

      if (cmd === 'clear') {
        clearOutput();
      } else if (cmd === 'download cv') {
        onDownloadCV();
      } else if (commands[cmd]) {
        addOutput({ type: 'output', text: commands[cmd], isHtml: true });
      } else if (cmd.startsWith('open ')) {
        const section = cmd.split(' ')[1];
        if (['about', 'projects', 'videos', 'contact'].includes(section)) {
          onSwitchTab(section);
          addOutput({ type: 'success', text: `Opened ${section}` });
        } else {
          addOutput({ type: 'error', text: 'Unknown section. Try: about, projects, videos, contact' });
        }
      } else if (cmd) {
        addOutput({ type: 'error', text: `Command not found: ${cmd}` });
      }

      setInputValue('');
    }
  };

  const renderLine = (line, i) => {
    if (line.type === 'command') {
      return (
        <div key={i} className="terminal-line">
          <span className="terminal-prompt">➜</span>
          <span className="terminal-path"> ~/portfolio</span>
          <span className="text-white"> {line.text}</span>
        </div>
      );
    }

    const cls = `terminal-line ${line.type === 'success' ? 'terminal-success' : line.type === 'error' ? 'terminal-error' : 'text-muted'}`;
    
    return line.isHtml 
      ? <div key={i} className={cls} dangerouslySetInnerHTML={{ __html: line.text }} />
      : <div key={i} className={cls}>{line.text}</div>;
  };

  return (
    <div className={`bottom-panel ${isOpen ? 'open' : ''}`}>
      <div className="terminal-tabs">
        <div className="terminal-tab active">TERMINAL</div>
        <div style={{ flex: 1 }}></div>
        <div className="panel-close" onClick={onClose}>×</div>
      </div>
      <div className="terminal-body" ref={termBodyRef}>
        <div>{output.map((line, i) => renderLine(line, i))}</div>
        <div className="terminal-line">
          <span className="terminal-prompt">➜</span>
          <span className="terminal-path"> ~/portfolio</span>
          <input
            ref={inputRef}
            type="text"
            id="term-input"
            autoComplete="off"
            spellCheck="false"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
