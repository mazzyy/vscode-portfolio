import React, { useState, useRef, useEffect, useCallback } from 'react';
import { projects } from '../../data/projects';
import { profile, skills, socials } from '../../data/profile';

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs. 🐛',
  'There are 10 kinds of people: those who understand binary and those who don\'t.',
  'A SQL query walks into a bar, walks up to two tables and asks: "Can I JOIN you?"',
  '!false — it\'s funny because it\'s true.',
  'I would tell you a UDP joke, but you might not get it.',
  'To understand recursion, you must first understand recursion.',
];

const BANNER = String.raw`
  __  __
 |  \/  |_   _ ___  __ ___      ____ _ _ __
 | |\/| | | | / __|/ _  \ \ /\ / / _  |  __|
 | |  | | |_| \__ \ (_| |\ V  V / (_| | |
 |_|  |_|\__,_|___/\__,_| \_/\_/ \__,_|_|
`;

const DEFAULT_INTRO = [
  { t: 'sys', v: "Welcome to musawar.sh — an interactive shell. Type 'help' to begin." },
];

function InteractiveTerminal({ onEnterVSCode, onMatrix, onGotoTab, onDownloadCV, initialLines, variant = 'default' }) {
  const [lines, setLines] = useState(initialLines || DEFAULT_INTRO);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const push = useCallback((arr) => setLines((prev) => [...prev, ...arr]), []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const run = useCallback((raw) => {
    const cmd = raw.trim();
    const out = [{ t: 'cmd', v: cmd }];
    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ');

    switch ((name || '').toLowerCase()) {
      case '':
        break;
      case 'help':
        out.push({ t: 'out', v: 'Available commands:' });
        out.push({ t: 'grid', v: [
          'help', 'whoami', 'about', 'skills', 'projects', 'ls',
          'cat <file>', 'social', 'resume', 'neofetch', 'date', 'echo <t>',
          'joke', 'game', 'matrix', 'theme', 'vscode', 'sudo', 'clear', 'banner',
        ] });
        break;
      case 'whoami':
        out.push({ t: 'out', v: `${profile.name} — ${profile.role}` });
        break;
      case 'about':
        out.push({ t: 'out', v: profile.bio });
        break;
      case 'skills':
        skills.forEach((s) => out.push({ t: 'out', v: `${s.title.padEnd(16)} ${'█'.repeat(Math.round(s.level / 7))} ${s.level}%` }));
        break;
      case 'projects':
        out.push({ t: 'out', v: `${projects.length} projects. Recent highlights:` });
        projects.slice(0, 8).forEach((p) => out.push({ t: 'link', v: `• ${p.title} — ${p.shortDesc}`, href: p.link }));
        out.push({ t: 'out', v: "Run 'open projects' section above for the full grid." });
        break;
      case 'ls':
        out.push({ t: 'grid', v: ['about.md', 'skills.json', 'projects/', 'experience.log', 'resume.pdf', 'contact.json', '.secrets'] });
        break;
      case 'cat': {
        const f = (arg || '').toLowerCase();
        if (!f) { out.push({ t: 'err', v: 'usage: cat <file>' }); break; }
        if (f.includes('contact')) out.push({ t: 'out', v: `email: ${profile.email}\nlocation: ${profile.location}\nstatus: ${profile.status}` });
        else if (f.includes('skills')) out.push({ t: 'out', v: skills.map((s) => s.title).join(', ') });
        else if (f.includes('about')) out.push({ t: 'out', v: profile.bio });
        else if (f.includes('secret')) out.push({ t: 'ok', v: '🔓 Easter egg: try the Konami code (↑↑↓↓←→←→ B A) anywhere on this page.' });
        else out.push({ t: 'err', v: `cat: ${arg}: No such file` });
        break;
      }
      case 'social':
      case 'contact':
        out.push({ t: 'link', v: 'GitHub   → github.com/mazzyy', href: socials.github });
        out.push({ t: 'link', v: 'LinkedIn → linkedin.com/in/musawar', href: socials.linkedin });
        out.push({ t: 'link', v: 'YouTube  → @Ideeaflux', href: socials.youtube });
        out.push({ t: 'link', v: `Email    → ${profile.email}`, href: socials.email });
        break;
      case 'resume':
      case 'cv':
        out.push({ t: 'ok', v: 'Downloading resume.pdf ...' });
        if (onDownloadCV) onDownloadCV();
        break;
      case 'neofetch':
        out.push({ t: 'neofetch' });
        break;
      case 'date':
        out.push({ t: 'out', v: new Date().toString() });
        break;
      case 'echo':
        out.push({ t: 'out', v: arg });
        break;
      case 'joke':
        out.push({ t: 'out', v: JOKES[Math.floor(Math.random() * JOKES.length)] });
        break;
      case 'game':
      case 'snake':
        out.push({ t: 'ok', v: 'Launching Snake… use the Snake tab above. Arrow keys / WASD to play.' });
        if (onGotoTab) onGotoTab('snake');
        break;
      case 'matrix':
        out.push({ t: 'ok', v: 'Entering the matrix… (click anywhere to exit)' });
        if (onMatrix) onMatrix();
        break;
      case 'theme':
        out.push({ t: 'ok', v: 'Open the Theme Lab tab to recolor this experience live.' });
        if (onGotoTab) onGotoTab('theme');
        break;
      case 'vscode':
        out.push({ t: 'ok', v: 'Switching to VS Code mode…' });
        setTimeout(() => onEnterVSCode && onEnterVSCode(), 500);
        break;
      case 'sudo':
        out.push({ t: 'err', v: `${profile.firstName} is not in the sudoers file. This incident will be reported. 😏` });
        break;
      case 'banner':
        out.push({ t: 'ascii', v: BANNER });
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
        out.push({ t: 'out', v: "There's no escape. Try 'vscode' instead. 🙂" });
        break;
      default:
        out.push({ t: 'err', v: `command not found: ${name} — type 'help'` });
    }
    push(out);
  }, [push, onEnterVSCode, onMatrix, onGotoTab, onDownloadCV]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.trim()) { setHistory((h) => [...h, input]); setHIdx(-1); }
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni); setInput(history[ni]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx === -1) return;
      const ni = hIdx + 1;
      if (ni >= history.length) { setHIdx(-1); setInput(''); } else { setHIdx(ni); setInput(history[ni]); }
    }
  };

  return (
    <div className={`mp-pg-term mp-pg-term-${variant}`} onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className="mp-pg-term-body" ref={bodyRef}>
        {lines.map((l, i) => {
          if (l.t === 'cmd') return <div key={i} className="mp-pgt-line"><span className="mp-prompt">➜</span> <span className="mp-path">~</span> <span className="mp-pgt-cmd">{l.v}</span></div>;
          if (l.t === 'err') return <div key={i} className="mp-pgt-err">{l.v}</div>;
          if (l.t === 'ok') return <div key={i} className="mp-pgt-ok">{l.v}</div>;
          if (l.t === 'sys') return <div key={i} className="mp-pgt-sys">{l.v}</div>;
          if (l.t === 'ascii') return <pre key={i} className="mp-pgt-ascii">{l.v}</pre>;
          if (l.t === 'json') return <pre key={i} className="mp-term-json mp-pgt-json">{l.v}</pre>;
          if (l.t === 'grid') return <div key={i} className="mp-pgt-grid">{l.v.map((g) => <span key={g}>{g}</span>)}</div>;
          if (l.t === 'link') return <div key={i} className="mp-pgt-out"><a href={l.href} target="_blank" rel="noopener noreferrer">{l.v}</a></div>;
          if (l.t === 'neofetch') return (
            <div key={i} className="mp-pgt-neo">
              <pre className="mp-pgt-neo-logo">{`   ╔═╗
   ║▓║   musawar@portfolio
   ╚═╝   ------------------`}</pre>
              <div className="mp-pgt-neo-info">
                <div><b>OS</b>: Web (React 18)</div>
                <div><b>Host</b>: musawar.tech</div>
                <div><b>Role</b>: Kubernetes Developer</div>
                <div><b>Shell</b>: musawar.sh</div>
                <div><b>Uptime</b>: 6+ years</div>
                <div><b>Stack</b>: Cloud · AI · DevOps</div>
              </div>
            </div>
          );
          return <div key={i} className="mp-pgt-out">{l.v}</div>;
        })}
      </div>
      <div className="mp-pg-term-input">
        <span className="mp-prompt">➜</span> <span className="mp-path">~</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck="false"
          autoComplete="off"
          aria-label="terminal input"
          placeholder="type a command…"
        />
      </div>
    </div>
  );
}

export default InteractiveTerminal;
