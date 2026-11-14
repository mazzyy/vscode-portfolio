import React from 'react';

/*
  An ID badge on a (tilted) lanyard. By default it shows the logo side with a
  magic wand resting to its left; on hover the wand sweeps across and the card
  spins a full turn to reveal the photo side. Inspired by aayushbharti.in.
  The wand is an original, generic design.
*/
function Wand() {
  return (
    <svg className="mp-wandfx" viewBox="0 0 48 440" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="mpWandTip" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#d4d4d8" strokeWidth="1.3" opacity="0.9" strokeLinecap="round">
        <path d="M24 24 C 29 120, 29 250, 25 340 C 24 388, 24 414, 24 430" />
        <path d="M24 24 C 19 120, 19 250, 23 340 C 24 388, 24 414, 24 430" />
        <ellipse cx="24" cy="135" rx="7" ry="13" />
        <ellipse cx="24" cy="255" rx="8.5" ry="15" />
        <ellipse cx="24" cy="365" rx="10.5" ry="18" />
      </g>
      <circle cx="24" cy="20" r="18" fill="url(#mpWandTip)" />
      <circle cx="24" cy="20" r="3.5" fill="#ffffff" />
      <circle cx="13" cy="48" r="1.6" fill="#ffffff" opacity="0.85" />
      <circle cx="35" cy="68" r="1.3" fill="#ec4899" opacity="0.85" />
      <circle cx="17" cy="94" r="1.1" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

function WandReveal({ src = 'character/look-00.webp', name = 'Abdul Musawar Soomro', role = 'Cloud & AI Engineer' }) {
  return (
    <div className="mp-badge-wrap">
      <Wand />
      <div className="mp-badge-hang">
        <div className="mp-badge-strap"><span>musawar.tech · musawar.tech ·</span></div>
        <div className="mp-badge-clip" />
        <div className="mp-badge">
          <div className="mp-badge-face mp-badge-front">
            <div className="mp-badge-monobig">AMS</div>
            <div className="mp-badge-frontname">Abdul Musawar Soomro</div>
          </div>
          <div className="mp-badge-face mp-badge-back">
            <div className="mp-badge-corner">AMS</div>
            <div className="mp-badge-pic"><img src={src} alt={name} draggable="false" /></div>
            <div className="mp-badge-backname">{name}</div>
            <div className="mp-badge-backrole">{role}</div>
          </div>
        </div>
      </div>
      <div className="mp-badge-hint"><i className="fas fa-wand-magic-sparkles" /> hover — the wand flips the badge</div>
    </div>
  );
}

export default WandReveal;
