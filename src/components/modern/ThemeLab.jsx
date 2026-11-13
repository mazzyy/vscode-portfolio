import React, { useState, useEffect } from 'react';

export const PRESETS = [
  { key: 'mint', name: 'Mint Terminal', a: '#00ffc3', b: '#00d4ff' },
  { key: 'cyber', name: 'Cyber Blue', a: '#00d4ff', b: '#4fc1ff' },
  { key: 'purple', name: 'Purple Haze', a: '#b14eff', b: '#00d4ff' },
  { key: 'matrix', name: 'Matrix', a: '#00ff6a', b: '#00ffc3' },
  { key: 'sunset', name: 'Sunset', a: '#ff8a3d', b: '#ff4d6d' },
  { key: 'pink', name: 'Hot Pink', a: '#ff2e97', b: '#b14eff' },
];

export function applyAccent(preset, glow) {
  const root = document.querySelector('.modern-root');
  if (!root) return;
  if (preset) {
    root.style.setProperty('--mp-accent', preset.a);
    root.style.setProperty('--mp-accent-2', preset.b);
  }
  if (typeof glow === 'number') {
    root.style.setProperty('--mp-glow-strength', `${glow}px`);
  }
}

export function loadSavedTheme() {
  try {
    const key = localStorage.getItem('mp-accent');
    const glow = parseInt(localStorage.getItem('mp-glow') || '18', 10);
    const preset = PRESETS.find((p) => p.key === key);
    if (preset || !Number.isNaN(glow)) applyAccent(preset, Number.isNaN(glow) ? 18 : glow);
  } catch (e) { /* ignore */ }
}

function ThemeLab() {
  const [active, setActive] = useState(() => {
    try { return localStorage.getItem('mp-accent') || 'mint'; } catch (e) { return 'mint'; }
  });
  const [glow, setGlow] = useState(() => {
    try { return parseInt(localStorage.getItem('mp-glow') || '18', 10); } catch (e) { return 18; }
  });

  useEffect(() => {
    const preset = PRESETS.find((p) => p.key === active);
    applyAccent(preset, glow);
    try {
      localStorage.setItem('mp-accent', active);
      localStorage.setItem('mp-glow', String(glow));
    } catch (e) { /* ignore */ }
  }, [active, glow]);

  return (
    <div className="mp-themelab">
      <p className="mp-themelab-note">
        <span className="mp-prompt">~$</span> theme --set &lt;accent&gt; — recolors this entire experience live.
      </p>

      <div className="mp-swatches">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            className={`mp-swatch ${active === p.key ? 'active' : ''}`}
            onClick={() => { setActive(p.key); try { window.dispatchEvent(new CustomEvent('pet-react', { detail: { emotion: 'smile', say: 'ooh, new colors ✨' } })); } catch (e) { /* ignore */ } }}
            style={{ '--sw-a': p.a, '--sw-b': p.b }}
          >
            <span className="mp-swatch-chip" />
            <span className="mp-swatch-name">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="mp-glow-row">
        <label htmlFor="glow">glow intensity</label>
        <input
          id="glow"
          type="range"
          min="0"
          max="34"
          value={glow}
          onChange={(e) => setGlow(parseInt(e.target.value, 10))}
        />
        <span className="mp-glow-val">{glow}px</span>
      </div>

      <div className="mp-themelab-preview">
        <button className="mp-btn mp-btn-primary mp-btn-sm">Primary</button>
        <button className="mp-btn mp-btn-outline mp-btn-sm">Outline</button>
        <span className="mp-chip-featured">★ Featured</span>
        <span className="mp-grad mp-themelab-grad">gradient text</span>
      </div>
    </div>
  );
}

export default ThemeLab;
