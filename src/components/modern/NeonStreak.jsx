import React from 'react';

/*
  A flowing red-orange neon light streak — a bright core with a soft glow
  underlay and a highlight that travels along the curve. Purely decorative.
  Position it with CSS via the passed className.
*/
function NeonStreak({ className = '', path }) {
  const d = path || 'M-60,300 C 220,110 430,30 660,120 C 880,205 1050,360 1260,150';
  return (
    <svg
      className={`mp-neon-streak ${className}`}
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mpNeonRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff2d1a" />
          <stop offset="0.5" stopColor="#ff7a21" />
          <stop offset="1" stopColor="#ff2d6b" />
        </linearGradient>
        <filter id="mpNeonBlur" x="-10%" y="-80%" width="120%" height="260%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      {/* ambient glow */}
      <path d={d} fill="none" stroke="url(#mpNeonRed)" strokeWidth="22" filter="url(#mpNeonBlur)" opacity="0.4" />
      <path d={d} fill="none" stroke="url(#mpNeonRed)" strokeWidth="8" filter="url(#mpNeonBlur)" opacity="0.85" />
      {/* bright core */}
      <path d={d} fill="none" stroke="#ffe7d2" strokeWidth="2" />
      {/* traveling highlight */}
      <path d={d} fill="none" stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round" className="mp-neon-travel" />
    </svg>
  );
}

export default NeonStreak;
