import React, { useState, useRef, useEffect, useCallback } from 'react';

const SNIPPETS = [
  `const deploy = async (app) => {\n  await build(app);\n  await test(app);\n  return ship(app);\n};`,
  `kubectl apply -f deployment.yaml\nkubectl rollout status deploy/api\nkubectl get pods -n prod`,
  `def rag(query):\n    docs = retrieve(query)\n    ctx = embed(docs)\n    return llm(query, ctx)`,
];

function TypingTest() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [startAt, setStartAt] = useState(null);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const inputRef = useRef(null);
  const target = SNIPPETS[idx];

  const reset = useCallback((nextIdx) => {
    setTyped('');
    setStartAt(null);
    setDone(false);
    setElapsed(0);
    if (typeof nextIdx === 'number') setIdx(nextIdx);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  }, []);

  useEffect(() => {
    if (!startAt || done) return;
    const id = setInterval(() => setElapsed((Date.now() - startAt) / 1000), 100);
    return () => clearInterval(id);
  }, [startAt, done]);

  const onChange = (e) => {
    const val = e.target.value;
    if (!startAt && val.length > 0) setStartAt(Date.now());
    setTyped(val);
    if (val.length >= target.length) {
      setDone(true);
      setElapsed((Date.now() - (startAt || Date.now())) / 1000);
    }
  };

  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const minutes = elapsed / 60;
  const wpm = minutes > 0 ? Math.round((typed.length / 5) / minutes) : 0;
  const progress = Math.min(100, Math.round((typed.length / target.length) * 100));

  return (
    <div className="mp-typing">
      <div className="mp-typing-stats">
        <div className="mp-typing-stat"><b>{done ? wpm : (minutes > 0 ? wpm : 0)}</b><span>WPM</span></div>
        <div className="mp-typing-stat"><b>{accuracy}%</b><span>accuracy</span></div>
        <div className="mp-typing-stat"><b>{elapsed.toFixed(1)}s</b><span>time</span></div>
        <div className="mp-typing-stat"><b>{progress}%</b><span>done</span></div>
      </div>

      <div className="mp-typing-track"><div className="mp-typing-fill" style={{ width: `${progress}%` }} /></div>

      <pre className="mp-typing-code" onClick={() => inputRef.current && inputRef.current.focus()}>
        {target.split('').map((ch, i) => {
          let cls = 'pending';
          if (i < typed.length) cls = typed[i] === ch ? 'right' : 'wrong';
          const isCursor = i === typed.length && !done;
          return (
            <span key={i} className={`mp-typing-char ${cls} ${isCursor ? 'cursor' : ''}`}>
              {ch === '\n' ? '↵\n' : ch}
            </span>
          );
        })}
      </pre>

      <textarea
        ref={inputRef}
        className="mp-typing-input"
        value={typed}
        onChange={onChange}
        spellCheck="false"
        disabled={done}
        placeholder="Click here and start typing the snippet above…"
        aria-label="typing test input"
      />

      <div className="mp-typing-actions">
        {done && <span className="mp-typing-result">✔ {wpm} WPM · {accuracy}% accuracy</span>}
        <button className="mp-btn mp-btn-ghost mp-btn-sm" onClick={() => reset()}>↻ Retry</button>
        <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={() => reset((idx + 1) % SNIPPETS.length)}>Next snippet →</button>
      </div>
    </div>
  );
}

export default TypingTest;
