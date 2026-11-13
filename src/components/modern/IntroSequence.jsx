import React, { useState, useEffect } from 'react';

/*
  A short boot/loader that counts 000 → 100 then curtains up to reveal the
  site. Shown once per tab session.
*/
const WORDS = ['booting modules', 'loading projects', 'warming up agents', 'ready'];

function IntroSequence({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let raf;
    const start = performance.now();
    const dur = 1900;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        setTimeout(() => { document.body.style.overflow = prev; onDone(); }, 780);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = prev; };
  }, [onDone]);

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length))];

  return (
    <div className={`mp-intro ${leaving ? 'leaving' : ''}`} aria-hidden="true">
      <div className="mp-intro-grid" />
      <div className="mp-intro-inner">
        <div className="mp-intro-logo">
          <span className="b">{'<'}</span> musawar <span className="b">{'/>'}</span>
        </div>
        <div className="mp-intro-bar"><div className="mp-intro-fill" style={{ width: `${count}%` }} /></div>
        <div className="mp-intro-meta">
          <span className="mp-intro-word">{word}<span className="mp-intro-dots" /></span>
          <span className="mp-intro-count">{String(count).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  );
}

export default IntroSequence;
